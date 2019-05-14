import { useEffect, useState, useRef } from 'react';
import createRandomName from './utils/createRandomName';
import calculateTotalDuration from './utils/calculateTotalDuration';
import createTag from './logic/createTag';
import deleteRules from './logic/deleteRules';
import { AnimateKeyframesProps, AnimationProps } from './types';

interface Props {
  sequences: [AnimationProps | AnimateKeyframesProps];
}

function createArrayWithNumbers(length: number) {
  return Array.from({ length }, () => null);
}

export default function useAnimateGroup(props: Props) {
  const { sequences = [] } = props;
  const defaultArray = createArrayWithNumbers(sequences.length);
  const [styles, setStyles] = useState(defaultArray);
  const [isPlaying, setPlaying] = useState(false);
  const animationNamesRef = useRef({});

  useEffect(() => {
    let localStyleTag;

    // @ts-ignore
    sequences.forEach(({ keyframes = false }, i) => {
      if (!Array.isArray(keyframes)) return;
      const animationName = createRandomName();
      animationNamesRef.current[i] = animationName;
      const { styleTag } = createTag({ animationName, keyframes });
      localStyleTag = styleTag;
    });

    return () => {
      if (!localStyleTag) return;
      Object.values(animationNamesRef).forEach(name => {
        deleteRules(localStyleTag.sheet, name);
      });
    };
  }, []);

  const play = (isPlay: boolean) => {
    const styles = sequences
      // @ts-ignore
      .reduce((previous: [{ totalDuration: number; style: {} }], current, currentIndex) => {
        const {
          duration = 0.3,
          delay = 0,
          overlay,
          easeType = 'linear',
          keyframes,
          iterationCount,
          direction,
          fillMode,
          playState,
          end = {},
          start = {},
        } = current;
        const lastIndex = currentIndex - 1;
        const totalDuration =
          calculateTotalDuration({ duration, delay, overlay }) +
          (currentIndex === 0 ? 0 : previous[lastIndex].totalDuration);

        if (keyframes) {
          previous.push({
            style: {
              animation: `${duration}s ${easeType} ${
                currentIndex === 0 ? delay : previous[lastIndex].totalDuration
              }s ${iterationCount} ${direction} ${fillMode} ${playState} ${animationNamesRef.current[currentIndex]}`,
            },
            totalDuration,
          });

          return previous;
        }

        const transition = `all ${duration}s ${easeType} ${delay}s`;
        previous.push({
          style: {
            ...isPlay ? end : start,
            transition,
          },
          totalDuration,
        });

        return previous;
      }, [])
      .map(({ style }) => style);

    setStyles(styles);
    setPlaying(!isPlaying);
  };

  return { styles, play, isPlaying };
}

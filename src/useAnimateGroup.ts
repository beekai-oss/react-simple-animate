import { useEffect, useState, useRef } from 'react';
import createRandomName from './utils/createRandomName';
import calculateTotalDuration from './utils/calculateTotalDuration';
import createTag from './logic/createTag';
import deleteRules from './logic/deleteRules';
import { HookSequences } from './types';
import getPlayState from './utils/getPlayState';

interface Props {
  sequences: HookSequences;
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
    let totalDuration = 0;
    const styles = (isPlay ? sequences : [...sequences].reverse()).map((current, currentIndex) => {
      const {
        duration = 0.3,
        delay = 0,
        overlay,
        keyframes,
        iterationCount = 1,
        easeType = 'linear',
        direction = 'normal',
        fillMode = 'none',
        end = {},
        start = {},
      } = current;
      const delayDuration = currentIndex === 0 ? delay : totalDuration;
      const transition = `all ${duration}s ${easeType} ${delayDuration}s`;
      totalDuration = calculateTotalDuration({ duration, delay, overlay }) + totalDuration;

      return keyframes
        ? {
            animation: `${duration}s ${easeType} ${delayDuration}s ${iterationCount} ${direction} ${fillMode} ${getPlayState(
              isPlay,
            )} ${animationNamesRef.current[currentIndex]}`,
          }
        : {
            ...(isPlay ? end : start),
            transition,
          };
    });

    // @ts-ignore
    setStyles(isPlay ? styles : [...styles].reverse());
    setPlaying(!isPlaying);
  };

  return { styles, play, isPlaying };
}

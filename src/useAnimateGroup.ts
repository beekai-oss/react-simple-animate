import * as React from 'react';
import createRandomName from './utils/createRandomName';
import calculateTotalDuration from './utils/calculateTotalDuration';
import createTag from './logic/createTag';
import deleteRules from './logic/deleteRules';
import { HookSequences, Style } from './types';

const { useEffect, useState, useRef } = React;

interface Props {
  sequences: HookSequences;
}

function createArrayWithNumbers(length: number): null[] {
  return Array.from({ length }, (): null => null);
}

export default function useAnimateGroup(
  props: Props,
): { styles: (Style | null)[]; play: (boolean) => void; isPlaying: boolean } {
  const { sequences = [] } = props;
  const defaultArray = createArrayWithNumbers(sequences.length);
  const [styles, setStyles] = useState(defaultArray);
  const [isPlaying, setPlaying] = useState(false);
  const animationNamesRef = useRef<
    { forward: string; reverse: string; animationName }[]
  >([]);
  const styleTagRef = useRef<{ forward?: string; reverse?: string }[]>([]);

  useEffect((): any => {
    sequences.forEach(
      ({ keyframes = false }, i): void => {
        if (!Array.isArray(keyframes)) return;

        if (!animationNamesRef.current[i]) {
          animationNamesRef.current[i] = {} as any;
          styleTagRef.current[i] = {};
        }

        animationNamesRef.current[i].forward = createRandomName();
        let result = createTag({
          animationName: animationNamesRef.current[i].forward,
          keyframes,
        });
        styleTagRef.current[i].forward = result.styleTag;

        animationNamesRef.current[i].reverse = createRandomName();
        result = createTag({
          animationName: animationNamesRef.current[i].reverse,
          keyframes: keyframes.reverse(),
        });
        styleTagRef.current[i].reverse = result.styleTag;
      },
    );

    return (): void => {
      Object.values(animationNamesRef).forEach(
        ({ forward, reverse }, i): void => {
          if (!styleTagRef[i]) return;
          deleteRules(styleTagRef[i].sheet, forward);
          deleteRules(styleTagRef[i].sheet, reverse);
        },
      );
    };
  }, []);

  const play = (isPlay: boolean): void => {
    let totalDuration = 0;
    const animationRefWithOrder = isPlay
      ? animationNamesRef.current
      : [...animationNamesRef.current].reverse();
    const styles = (isPlay ? sequences : [...sequences].reverse()).map(
      (current, currentIndex): Style => {
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
        totalDuration =
          calculateTotalDuration({ duration, delay, overlay }) + totalDuration;

        return keyframes
          ? {
              animation: `${duration}s ${easeType} ${delayDuration}s ${iterationCount} ${direction} ${fillMode} running ${
                isPlay
                  ? animationRefWithOrder[currentIndex].forward
                  : animationRefWithOrder[currentIndex].reverse
              }`,
            }
          : {
              ...(isPlay ? end : start),
              transition,
            };
      },
    );

    // @ts-ignore
    setStyles(isPlay ? styles : [...styles].reverse());
    setPlaying(!isPlaying);
  };

  return { styles, play, isPlaying };
}

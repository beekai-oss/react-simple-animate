import * as React from 'react';
import createRandomName from './utils/createRandomName';
import createArrayWithNumbers from './utils/createArrayWithNumbers';
import calculateTotalDuration from './utils/calculateTotalDuration';
import createTag from './logic/createTag';
import deleteRules from './logic/deleteRules';
import { HookSequences, Style } from './types';
import {
  ALL,
  DEFAULT_DIRECTION,
  DEFAULT_DURATION,
  DEFAULT_EASE_TYPE,
  DEFAULT_FILLMODE,
  RUNNING,
} from './constants';

interface Props {
  sequences: HookSequences;
}

export default function useAnimateGroup(
  props: Props,
): { styles: (Style | null)[]; play: (boolean) => void; isPlaying: boolean } {
  const { sequences = [] } = props;
  const defaultArray = createArrayWithNumbers(sequences.length).map(
    (_, index) => props.sequences[index].start,
  ) as Style[];
  const [styles, setStyles] = React.useState(defaultArray);
  const [isPlaying, setPlaying] = React.useState(false);
  const animationNamesRef = React.useRef<
    { forward: string; reverse: string; animationName }[]
  >([]);
  const styleTagRef = React.useRef<{ forward?: string; reverse?: string }[]>(
    [],
  );
  const playRef = React.useRef<(isPlay: boolean) => void>();

  React.useEffect(() => {
    sequences.forEach(({ keyframes = false }, i): void => {
      if (!Array.isArray(keyframes)) {
        return;
      }

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
    });

    return () =>
      Object.values(animationNamesRef).forEach(
        ({ forward, reverse }, i): void => {
          if (!styleTagRef[i]) {
            return;
          }
          deleteRules(styleTagRef[i].sheet, forward);
          deleteRules(styleTagRef[i].sheet, reverse);
        },
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  playRef.current = playRef.current
    ? playRef.current
    : (isPlay: boolean) => {
        let totalDuration = 0;
        const animationRefWithOrder = isPlay
          ? animationNamesRef.current
          : [...animationNamesRef.current].reverse();
        const styles = (isPlay ? sequences : [...sequences].reverse()).map(
          (current, currentIndex): Style => {
            const {
              duration = DEFAULT_DURATION,
              delay = 0,
              overlay,
              keyframes,
              iterationCount = 1,
              easeType = DEFAULT_EASE_TYPE,
              direction = DEFAULT_DIRECTION,
              fillMode = DEFAULT_FILLMODE,
              end = {},
              start = {},
            } = current;
            const delayDuration = currentIndex === 0 ? delay : totalDuration;
            const transition = `${ALL} ${duration}s ${easeType} ${delayDuration}s`;
            totalDuration =
              calculateTotalDuration({ duration, delay, overlay }) +
              totalDuration;

            return keyframes
              ? {
                  animation: `${duration}s ${easeType} ${delayDuration}s ${iterationCount} ${direction} ${fillMode} ${RUNNING} ${
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

        setStyles(isPlay ? styles : [...styles].reverse());
        setPlaying(!isPlaying);
      };

  return { styles, play: playRef.current, isPlaying };
}

import * as React from 'react';
import {
  ALL,
  DEFAULT_DIRECTION,
  DEFAULT_DURATION,
  DEFAULT_EASE_TYPE,
  DEFAULT_FILLMODE,
  RUNNING,
} from './constants';
import createTag from './logic/createTag';
import deleteRules from './logic/deleteRules';
import type { HookSequences } from './types';
import calculateTotalDuration from './utils/calculateTotalDuration';
import createArrayWithNumbers from './utils/createArrayWithNumbers';
import createRandomName from './utils/createRandomName';

interface Props {
  sequences: HookSequences;
  onCancel?: () => void;
}

export default function useAnimateGroup(props: Props): {
  styles: (React.CSSProperties | undefined)[];
  play: (isPlaying: boolean) => void;
  cancel: () => void;
  isPlaying: boolean;
} {
  const { sequences = [] } = props;
  const { onCancel } = props;
  const defaultArray = createArrayWithNumbers(sequences.length).map(
    (_, index) => props.sequences[index].start,
  ) as React.CSSProperties[];
  const [styles, setStyles] = React.useState(defaultArray);
  const [isPlaying, setPlaying] = React.useState(false);
  const isActiveRef = React.useRef(false);
  const hasCancelledRef = React.useRef(false);
  const animationNamesRef = React.useRef<
    { forward: string; reverse: string }[]
  >([]);
  const styleTagRef = React.useRef<
    { forward?: HTMLStyleElement; reverse?: HTMLStyleElement }[]
  >([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: animation style tags are created once on mount
  React.useEffect(() => {
    sequences.forEach(({ keyframes }, i) => {
      if (!Array.isArray(keyframes)) {
        return;
      }

      if (!animationNamesRef.current[i]) {
        animationNamesRef.current[i] = { forward: '', reverse: '' };
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
        keyframes: [...keyframes].reverse() as typeof keyframes,
      });
      styleTagRef.current[i].reverse = result.styleTag;
    });

    const styleTags = styleTagRef.current;
    const animationNames = animationNamesRef.current;

    return () =>
      animationNames.forEach(({ forward, reverse }, i) => {
        deleteRules(styleTags[i]?.forward?.sheet, forward);
        deleteRules(styleTags[i]?.reverse?.sheet, reverse);
      });
  }, []);

  const play = React.useCallback(
    (isPlay: boolean) => {
      isActiveRef.current = true;
      hasCancelledRef.current = false;
      let totalDuration = 0;
      const animationRefWithOrder = isPlay
        ? animationNamesRef.current
        : [...animationNamesRef.current].reverse();
      const styles = (isPlay ? sequences : [...sequences].reverse()).map(
        (current, currentIndex): React.CSSProperties => {
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
      setPlaying(isPlay);
    },
    [sequences],
  );

  const cancel = React.useCallback(() => {
    if (isActiveRef.current && !hasCancelledRef.current) {
      hasCancelledRef.current = true;
      onCancel?.();
    }
    isActiveRef.current = false;
    setStyles((currentStyles) =>
      currentStyles.map((style) => {
        if (!style) {
          return style;
        }
        return style.animation
          ? { ...style, animation: 'none' }
          : { ...style, transition: 'none' };
      }),
    );
    setPlaying(false);
  }, [onCancel]);

  return { styles, play, cancel, isPlaying };
}

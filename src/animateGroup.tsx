import * as React from 'react';
import calculateTotalDuration from './utils/calculateTotalDuration';
import getSequenceId from './utils/getSequenceId';
import isUndefined from './utils/isUndefined';
import { DEFAULT_DURATION } from './constants';
import { Sequences, AnimationProps, AnimateKeyframesProps } from './types';

export interface Props {
  play: boolean;
  sequences?: Sequences;
  children?: any;
}

export const AnimateContext = React.createContext({
  animationStates: {},
  register: (data: AnimationProps | AnimateKeyframesProps): void => {},
});

export default function AnimateGroup({
  play,
  sequences = [],
  children,
}: Props) {
  const [animationStates, setAnimationStates] = React.useState({});
  const animationsRef = React.useRef<{
    [key: string]: AnimationProps | AnimateKeyframesProps;
  }>({});

  const register = React.useCallback(
    (data: AnimationProps | AnimateKeyframesProps) => {
      const { sequenceIndex, sequenceId } = data;
      if (!isUndefined(sequenceId) || !isUndefined(sequenceIndex)) {
        animationsRef.current[getSequenceId(sequenceIndex, sequenceId)] = data;
      }
    },
    [],
  );

  React.useEffect(() => {
    const sequencesToAnimate =
      Array.isArray(sequences) && sequences.length
        ? sequences
        : Object.values(animationsRef.current);
    const localAnimationState = {};

    (play ? sequencesToAnimate : [...sequencesToAnimate].reverse()).reduce(
      (
        previous,
        {
          sequenceId,
          sequenceIndex,
          duration = DEFAULT_DURATION,
          delay,
          overlay,
        },
        currentIndex,
      ) => {
        const id = getSequenceId(sequenceIndex, sequenceId, currentIndex);
        const currentTotalDuration = calculateTotalDuration({
          duration,
          delay,
          overlay,
        });
        const totalDuration = currentTotalDuration + previous;

        localAnimationState[id] = {
          play,
          pause: !play,
          delay:
            currentIndex === 0
              ? delay || 0
              : delay
              ? previous + delay
              : previous,
          controlled: true,
        };

        return totalDuration;
      },
      0,
    );

    setAnimationStates(localAnimationState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  return (
    <AnimateContext.Provider value={{ animationStates, register }}>
      {children}
    </AnimateContext.Provider>
  );
}

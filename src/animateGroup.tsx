import * as React from 'react';
import { Sequences, AnimationProps, AnimateKeyframesProps } from './types';
import calculateTotalDuration from './utils/calculateTotalDuration';
import getSequenceId from './utils/getSequenceId';
import isUndefined from './utils/isUndefined';

const { useState, useRef, useEffect } = React;

export interface Props {
  play: boolean;
  sequences?: Sequences;
  children?: any;
}

export const AnimateContext = React.createContext({
  animationStates: {},
  register: (data: AnimationProps | AnimateKeyframesProps): void => {},
});

export default function AnimateGroup(props: Props) {
  const { play, sequences = [], children } = props;
  const [animationStates, setAnimationStates] = useState({});
  const animationsRef = useRef<{
    [key: string]: AnimationProps | AnimateKeyframesProps;
  }>({});

  const register = (data: AnimationProps | AnimateKeyframesProps) => {
    const { sequenceIndex, sequenceId } = data;
    if (isUndefined(sequenceId) && isUndefined(sequenceIndex)) return;

    animationsRef.current[getSequenceId(sequenceIndex, sequenceId)] = data;
  };

  useEffect((): void => {
    const sequencesToAnimate =
      Array.isArray(sequences) && sequences.length
        ? sequences
        : Object.values(animationsRef.current);
    const localAnimationState = {};

    (play ? sequencesToAnimate : [...sequencesToAnimate].reverse()).reduce(
      (previous, current, currentIndex) => {
        const { sequenceId, sequenceIndex, ...restAttributes } = current;
        const { duration: defaultDuration, delay, overlay } = restAttributes;
        const id = getSequenceId(sequenceIndex, sequenceId, currentIndex);
        const duration = defaultDuration || 0.3;
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
              ? currentTotalDuration
              : previous,
          controlled: true,
        };

        return totalDuration;
      },
      0,
    );

    setAnimationStates(localAnimationState);
  }, [play]);

  return (
    <AnimateContext.Provider value={{ animationStates, register }}>
      {children}
    </AnimateContext.Provider>
  );
}

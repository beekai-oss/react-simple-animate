import * as React from 'react';
import { Sequences, AnimationProps, AnimateKeyframesProps } from './types';
import calculateTotalDuration from './utils/calculateTotalDuration';

const { useState, useRef, useEffect } = React;

interface Props {
  play: boolean;
  sequences: Sequences;
  children: any;
}

export const AnimateContext = React.createContext({
  animationStates: {},
  register: (data: AnimationProps | AnimateKeyframesProps): void => {},
});

export default function AnimateGroup(props: Props) {
  const { play, sequences = [], children } = props;
  const [animationStates, setAnimationStates] = useState();
  const animationsRef = useRef({});

  const register = (data: AnimationProps | AnimateKeyframesProps) => {
    const { sequenceIndex, sequenceId } = data;
    const id = sequenceId || sequenceIndex;
    if (id === undefined || (sequenceIndex && sequenceIndex < 0) || (sequenceId && sequenceId === '')) return;

    animationsRef.current[id] = data;
  };

  useEffect(
    (): void => {
      const sequencesToAnimate = Array.isArray(sequences) && sequences.length ? sequences : Object.values(sequences);
      const localAnimationState = {};

      sequencesToAnimate.reduce((previous, current, currentIndex) => {
        const { sequenceId, sequenceIndex, ...restAttributes } = current;
        const { duration, delay, overlay } = restAttributes;
        const id =
          (sequenceId === undefined && sequenceIndex === undefined ? currentIndex : sequenceId || sequenceIndex) || 0;
        const totalDuration = calculateTotalDuration({ duration, delay, overlay }) + previous;

        localAnimationState[id] = {
          play,
          delay: currentIndex === 0 ? delay || 0 : totalDuration,
        };

        return totalDuration;
      }, 0);

      setAnimationStates(localAnimationState);
    },
    [play],
  );

  // @ts-ignore
  return (
    <AnimateContext.Provider value={{ animationStates, register }}>
      {/* @ts-ignore */}
      {children}
    </AnimateContext.Provider>
  );
}

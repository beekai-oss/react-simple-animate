import * as React from 'react';
import { Sequences } from './types';
import calculateTotalDuration from './utils/calculateTotalDuration';

const { useState, useRef, useEffect } = React;

interface Props {
  play: boolean;
  sequences: Sequences;
  children: any;
}

// $FlowIgnoreLine
export const AnimateContext = React.createContext({
  animationStates: {},
  register: (any): void => {},
});

export default function AnimateGroup(props: Props) {
  const { play, sequences = [], children } = props;
  const [animationStates, setAnimationStates] = useState();
  const animationsRef = useRef({});

  const register = data => {
    const { sequenceIndex, sequenceId } = data;
    const id = sequenceId || sequenceIndex;
    if (id === undefined || (sequenceIndex && sequenceIndex < 0) || (sequenceId && sequenceId === '')) return;

    animationsRef.current[id] = data;
  };

  useEffect(
    () => {
      const sequencesToAnimate =
        Array.isArray(sequences) && sequences.length ? sequences : Object.values(animationsRef.current);
      const localAnimationState = {};

      sequencesToAnimate.reduce((previous, current, currentIndex) => {
        // @ts-ignore
        const { sequenceId, sequenceIndex, ...restAttributes } = current;
        // @ts-ignore
        const { duration, delay, overlay } = restAttributes;
        const id = sequenceId === undefined && sequenceIndex === undefined ? currentIndex : sequenceId || sequenceIndex;
        // @ts-ignore
        const totalDuration = calculateTotalDuration({ duration, delay, overlay }) + previous;

        localAnimationState[id] = {
          play,
          delay: currentIndex === 0 ? 0 || delay : totalDuration,
        };

        return totalDuration;
      }, 0);

      setAnimationStates(localAnimationState);
    },
    [play],
  );

  // @ts-ignore
  return <AnimateContext.Provider value={{ animationStates, register }}>{children}</AnimateContext.Provider>;
}

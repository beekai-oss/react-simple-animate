// @flow
import React, { useState, useRef, useEffect } from 'react';
import type { Sequences } from './types';
import calculateTotalDuration from './utils/calculateTotalDuration';

type Props = {
  play: boolean,
  sequences: Sequences,
};

// $FlowIgnoreLine
export const AnimateContext = React.createContext({
  animationStates: {},
  register: () => {},
});

export default function AnimateGroup(props: Props) {
  const { play, sequences = [] } = props;
  const [animationStates, setAnimationStates] = useState();
  const animationsRef = useRef({});

  const register = (data) => {
    const { sequenceIndex, sequenceId } = data;
    const id = sequenceId || sequenceIndex;
    if (id === undefined || (sequenceIndex && sequenceIndex < 0) || (sequenceId && sequenceId === '')) return;

    animationsRef.current[id] = data;
  };

  useEffect(() => {
    const sequencesToAnimate =
      Array.isArray(sequences) && sequences.length ? sequences : Object.values(animationsRef.current);
    const reverseSequencesToAnimate = [...sequencesToAnimate].reverse();
    const localAnimationState = {};

    (play ? sequencesToAnimate : reverseSequencesToAnimate).reduce((previous, current, currentIndex) => {
      const { sequenceId, sequenceIndex, ...restAttributes } = current;
      const id = sequenceId === undefined && sequenceIndex === undefined ? currentIndex : sequenceId || sequenceIndex;
      const totalDuration =
        previous +
        calculateTotalDuration(restAttributes);

      localAnimationState[id] = {
        play,
        delay: currentIndex === 0 ? 0 || restAttributes.delay : totalDuration,
      };

      return totalDuration;
    }, 0);

    setAnimationStates(localAnimationState);
  }, [play]);

  return <AnimateContext.Provider value={{ animationStates, register }}>{props.children}</AnimateContext.Provider>;
}

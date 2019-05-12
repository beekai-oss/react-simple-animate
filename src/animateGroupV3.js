// @flow
import React, { type Element, useState, useRef, useEffect } from 'react';
import type { AnimationType, AnimationStateType } from './types';
import calculateTotalDuration from './utils/calculateTotalDuration';

type Sequence = AnimationType & {
  sequenceId?: string | number,
  sequenceIndex?: number,
};

type Sequences = Array<Sequence>;

type Props = {
  play: boolean,
  sequences?: Sequences,
  reverseSequences?: Sequences,
  children: Element<*>,
};

type State = {
  animationStates?: AnimationStateType,
};

// $FlowIgnoreLine
export const AnimateContext = React.createContext({
  animationStates: {},
  register: () => {},
});

export default function AnimateGroup(props: Props) {
  const [animationStates, setAnimationStates] = useState();
  const animationsRef = useRef({});

  const register = props => {
    const { sequenceIndex, sequenceId } = props;
    const id = sequenceId || sequenceIndex;
    if (id === undefined || (sequenceIndex && sequenceIndex < 0) || (sequenceId && sequenceId === '')) return;

    animationsRef.current[id] = {
      ...props,
    };

    console.log(animationsRef.current);
  };

  useEffect(() => {
    const { sequences, play } = props;
    const sequencesToAnimate =
      Array.isArray(sequences) && sequences.length ? sequences : Object.values(animationsRef.current);
    const reverseSequencesToAnimate = [...sequencesToAnimate].reverse();

    return (play ? sequencesToAnimate : reverseSequencesToAnimate).reduce((previous, current, currentIndex) => {
      const { sequenceId, sequenceIndex, ...restAttributes } = current;
      const id = sequenceId === undefined && sequenceIndex === undefined ? currentIndex : sequenceId || sequenceIndex;
      const totalDuration =
        previous +
        calculateTotalDuration({
          ...animationsRef.current[id],
          play,
          restAttributes,
        });

      console.log('totalDuration', totalDuration);
      return totalDuration;
    }, 0);
  });

  return <AnimateContext.Provider value={{ animationStates, register }}>{props.children}</AnimateContext.Provider>;
}

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

type SequenceId = number | string;
type PartialSequence = {
  play: boolean;
  pause: boolean;
  delay: number;
  controlled: boolean;
};
type AnimationStates = Record<SequenceId, PartialSequence>;
type Register = (data: AnimationProps | AnimateKeyframesProps) => void;

interface IAnimationContext {
  animationStates: AnimationStates;
  register: Register;
}
export const AnimateContext = React.createContext<IAnimationContext>({
  animationStates: {},
  register: () => {},
});

export default function AnimateGroup({
  play,
  sequences = [],
  children,
}: Props): React.ReactElement {
  const [animationStates, setAnimationStates] = React.useState<AnimationStates>(
    {},
  );
  const animationsRef = React.useRef<{
    [key: string]: AnimationProps | AnimateKeyframesProps;
  }>({});

  const register: Register = React.useCallback((data) => {
    const { sequenceIndex, sequenceId } = data;
    if (!isUndefined(sequenceId) || !isUndefined(sequenceIndex)) {
      animationsRef.current[getSequenceId(sequenceIndex, sequenceId)] = data;
    }
  }, []);

  React.useEffect(() => {
    const sequencesToAnimate =
      Array.isArray(sequences) && sequences.length
        ? sequences
        : Object.values(animationsRef.current);
    const localAnimationState: AnimationStates = {};

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
          delay: (delay || 0) + previous,
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

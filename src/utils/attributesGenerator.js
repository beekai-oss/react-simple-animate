// @flow
import type { State, Props } from '../animate';
import mapSequenceOverProps from './mapSequenceOverProps';

export default function attributesGenerator(props: Props, { willComplete, shouldMount }: State): Object {
  const { animationStates, sequenceId, sequenceIndex } = props;
  const id = sequenceId || sequenceIndex;
  const {
    play,
    startStyle,
    endStyle,
    onCompleteStyle,
    durationSeconds = 0.3,
    delaySeconds = 0,
    easeType = 'linear',
    className,
    reverseDurationSeconds = 0,
    reverseDelaySeconds = 0,
    unMount,
    mount,
    forwardedRef,
  } = mapSequenceOverProps(props, id);
  let style = startStyle;
  let transition = `all ${durationSeconds}s ${easeType} ${delaySeconds}s`;
  const willMountOrUnMount = unMount || (mount && !shouldMount);

  if (!willMountOrUnMount) {
    if (willComplete && onCompleteStyle && play) {
      style = onCompleteStyle;
      transition = '';
    } else if (
      mount ||
      play ||
      ((id || id === 0) &&
        Object.keys(animationStates).length &&
        animationStates[id] &&
        animationStates[id].play)
    ) {
      style = endStyle;
    } else if (!play && (reverseDurationSeconds || reverseDelaySeconds)) {
      transition = `all ${reverseDurationSeconds || durationSeconds}s ${easeType} ${reverseDelaySeconds}s`;
    }
  }

  return {
    className,
    style: {
      ...style,
      transition,
    },
    ref: forwardedRef,
  };
}

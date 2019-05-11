// @flow
import type { Props } from '../animate';
import mapSequenceOverProps from './mapSequenceOverProps';

export default function attributesGenerator(
  props: Props,
  willComplete?: boolean = false,
  isMountWithPlay?: mixed = false,
): Object {
  const { animationStates, sequenceId, sequenceIndex } = props;
  const id = sequenceId || sequenceIndex;
  const {
    play,
    start,
    end,
    onCompleteStyle,
    durationSeconds = 0.3,
    delaySeconds = 0,
    easeType = 'linear',
    className,
    reverseDurationSeconds = 0,
    reverseDelaySeconds = 0,
    forwardedRef,
  } = mapSequenceOverProps(props, id);
  let style = start;
  let transition = `all ${durationSeconds}s ${easeType} ${delaySeconds}s`;

  if (play !== undefined && !play && (reverseDurationSeconds || reverseDelaySeconds)) {
    transition = `all ${reverseDurationSeconds || durationSeconds}s ${easeType} ${
      play ? delaySeconds : reverseDelaySeconds
    }s`;
  } else if (!isMountWithPlay) {
    if (willComplete && onCompleteStyle && play) {
      style = onCompleteStyle;
      transition = '';
    } else if (
      play ||
      ((id || id === 0) &&
        animationStates &&
        Object.keys(animationStates).length &&
        animationStates[id] &&
        animationStates[id].play)
    ) {
      style = end;
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

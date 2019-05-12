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
    duration = 0.3,
    delay = 0,
    easeType = 'linear',
    className,
    reverseduration = 0,
    reversedelay = 0,
    forwardedRef,
  } = mapSequenceOverProps(props, id);
  let style = start;
  let transition = `all ${duration}s ${easeType} ${delay}s`;

  if (play !== undefined && !play && (reverseduration || reversedelay)) {
    transition = `all ${reverseduration || duration}s ${easeType} ${
      play ? delay : reversedelay
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

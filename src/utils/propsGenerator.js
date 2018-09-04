// @flow
import type { State, Props } from '../animate';
import mapSequenceOverProps from './mapSequenceOverProps';

export default function propsGenerator(props: Props, { willComplete }: State): Object {
  const {
    startAnimation,
    startStyle,
    endStyle,
    onCompleteStyle,
    durationSeconds = 0,
    delaySeconds = 0,
    easeType = '',
    className,
    refCallback,
    reverseDurationSeconds = 0,
    reverseDelaySeconds = 0,
  } = mapSequenceOverProps(props);
  const { animationStates, sequenceId, sequenceIndex } = props;
  const id = sequenceId || sequenceIndex;
  let style = startStyle;
  let transition = `all ${durationSeconds}s ${easeType} ${delaySeconds}s`;

  if (willComplete && onCompleteStyle && startAnimation) {
    style = onCompleteStyle;
    transition = null;
  } else if (animationStates && id && (startAnimation || (animationStates[id] && animationStates[id].startAnimation))) {
    style = endStyle;
  } else if (!startAnimation && (reverseDurationSeconds || reverseDelaySeconds)) {
    transition = `all ${reverseDurationSeconds}s ${easeType} ${reverseDelaySeconds}s`;
  }

  return {
    className,
    style: {
      ...style,
      transition,
    },
    // $FlowIgnoreLine
    ...(refCallback
      ? {
          ref: r => {
            refCallback(r);
          },
        }
      : null),
  };
}

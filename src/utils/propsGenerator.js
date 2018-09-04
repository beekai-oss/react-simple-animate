// @flow
import type { State, Props } from '../animate';
import mapAnimationSequenceOverProps from './mapAnimationSequenceOverProps';

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
  } = mapAnimationSequenceOverProps(props);
  const { animationStates, sequenceId, sequenceIndex } = props;

  let style = startStyle;
  let transition = `all ${durationSeconds}s ${easeType} ${delaySeconds}s`;

  const id = sequenceId || sequenceIndex;
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
      ...{
        ...style,
        transition,
      },
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

// @flow
import type { State, Props } from '../animate';
import mapSequenceOverProps from './mapSequenceOverProps';

export default function propsGenerator(props: Props, { willComplete }: State): Object {
  const { animationStates, sequenceId, sequenceIndex } = props;
  const id = sequenceId || sequenceIndex;
  const {
    startAnimation,
    startStyle,
    endStyle,
    onCompleteStyle,
    durationSeconds = 0.3,
    delaySeconds = 0,
    easeType = 'linear',
    className,
    refCallback,
    reverseDurationSeconds = 0,
    reverseDelaySeconds = 0,
  } = mapSequenceOverProps(props, id);
  let style = startStyle;
  let transition = `all ${durationSeconds}s ${easeType} ${delaySeconds}s`;

  if (willComplete && onCompleteStyle && startAnimation) {
    style = onCompleteStyle;
    transition = '';
  } else if (startAnimation || (animationStates && id && animationStates[id] && animationStates[id].startAnimation)) {
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

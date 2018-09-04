// @flow
import type { State, Props } from '../animate';

const mapAnimationSequenceOverProps = props => {
  const { animationStates, sequenceId, sequenceIndex } = props;
  const id = sequenceId || sequenceIndex;
  if (!id || !animationStates || !animationStates[id]) return props;

  const stateCopy = { ...animationStates[id] };
  return { ...stateCopy, ...props };
};

export default function propsGenerator(props: Props, { willComplete }: State): Object {
  const {
    startAnimation,
    startStyle,
    endStyle,
    onCompleteStyle,
    durationSeconds = 0,
    delaySeconds = 0,
    easeType = 'linear',
    className,
    refCallback,
    unMount,
    reverseDurationSeconds = 0,
    reverseDelaySeconds = 0,
  } = mapAnimationSequenceOverProps(props);
  const { animationStates, sequenceId, sequenceIndex } = props;

  let style = startStyle;
  let transition = `all ${durationSeconds}s ${easeType} ${delaySeconds}s`;

  if (!unMount) {
    const id = sequenceId || sequenceIndex;
    if (willComplete && onCompleteStyle && startAnimation) {
      style = onCompleteStyle;
      transition = null;
    } else if (
      animationStates &&
      id &&
      (startAnimation || (animationStates[id] && animationStates[id].startAnimation))
    ) {
      style = endStyle;
    } else if (!startAnimation && (reverseDurationSeconds || reverseDelaySeconds)) {
      transition = `all ${reverseDurationSeconds}s ${easeType} ${reverseDelaySeconds}s`;
    }
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

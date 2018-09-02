// @flow
import type { State, Props } from '../animate';

const mapAnimationSequenceOverProps = props => {
  const { animationStates, id } = props;
  if (!animationStates[id]) return props;

  const stateCopy = { ...animationStates[id] };
  return { ...stateCopy, ...props };
};

export default function propsGenerator(props: Props, { willComplete }: State): Object {
  const {
    play,
    startStyle,
    endStyle,
    onCompleteStyle,
    durationSeconds = 0,
    delaySeconds = 0,
    easing = 'linear',
    className,
    refCallback,
    unMount,
    reverseDurationSeconds = 0,
    reverseDelaySeconds = 0,
  } = mapAnimationSequenceOverProps(props);
  let style = startStyle;
  let transition = `all ${durationSeconds}s ${easing} ${delaySeconds}s`;

  if (!unMount) {
    if (willComplete && onCompleteStyle && play) {
      style = onCompleteStyle;
      transition = null;
    } else if (play || (props.animationStates[props.id] && props.animationStates[props.id].play)) {
      style = endStyle;
    } else if (!play && (reverseDurationSeconds || reverseDelaySeconds)) {
      transition = `all ${reverseDurationSeconds}s ${easing} ${reverseDelaySeconds}s`;
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

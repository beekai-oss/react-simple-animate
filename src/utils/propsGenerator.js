// @flow
import type { State, Props } from '../animate';

let style;
let transition;

export default function propsGenerator(
  props: Props,
  state: State,
  mountProps: { willUnmount: boolean, willMount: boolean } = {
    willUnmount: false,
    willMount: false,
  },
) {
  const {
    animationWillEnd,
    animationWillStart,
    animationWillComplete,
    animationWillEnter,
    animationWillLeave,
  } = state;
  const {
    startAnimation,
    startStyle,
    endStyle,
    onCompleteStyle,
    durationSeconds = 0.3,
    reverseDelaySeconds,
    delaySeconds,
    easeType = 'linear',
    className,
    transition: transitionValue,
  } = props;
  const { willUnmount, willMount } = mountProps;

  style = startStyle;
  transition = transitionValue || `${durationSeconds}s all ${easeType}`;

  if (willMount) {
    style = animationWillEnter ? endStyle : startStyle;
  } else if (willUnmount) {
    style = animationWillLeave ? endStyle : startStyle;
  } else if (reverseDelaySeconds && !startAnimation) {
    style = animationWillStart ? startStyle : endStyle;
  } else if (animationWillEnd || (startAnimation && !delaySeconds)) {
    style = endStyle;
  } else if (animationWillComplete && onCompleteStyle) {
    style = onCompleteStyle;
    transition = null;
  }

  return {
    className,
    style: {
      ...{
        ...style,
        transition,
      },
    },
  };
}

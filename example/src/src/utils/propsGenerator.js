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
    willEnd,
    willStart,
    willComplete,
    willEnter,
    willLeave,
    played,
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
    style = willEnter ? endStyle : startStyle;
  } else if (willUnmount) {
    style = willLeave ? endStyle : startStyle;
  } else if (reverseDelaySeconds && !startAnimation && played) {
    style = willStart ? startStyle : endStyle;
  } else if (willEnd || (startAnimation && !delaySeconds)) {
    style = endStyle;
  } else if (willComplete && onCompleteStyle) {
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

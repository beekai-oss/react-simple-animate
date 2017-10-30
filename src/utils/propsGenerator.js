// @flow
import type { State, Props } from '../animate';

let style;
let transition;

type MountProps = { willUnmount: boolean, willMount: boolean };

export default function propsGenerator(
  {
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
  }: Props,
  { willEnd, willStart, willComplete, willEnter, willLeave, played }: State,
  mountProps: MountProps = {
    willUnmount: false,
    willMount: false,
  },
) {
  const { willUnmount, willMount } = mountProps;
  style = startStyle;
  transition = transitionValue || `${durationSeconds}s all ${easeType}`;

  if (willMount) {
    style = willEnter ? endStyle : startStyle;
  } else if (willUnmount) {
    style = willLeave ? endStyle : startStyle;
  } else if (willComplete && onCompleteStyle) {
    style = onCompleteStyle;
    transition = null;
  } else if (reverseDelaySeconds && !startAnimation && played) {
    style = willStart ? startStyle : endStyle;
  } else if (willEnd || (startAnimation && !delaySeconds)) {
    style = endStyle;
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

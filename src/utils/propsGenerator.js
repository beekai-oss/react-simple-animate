// @flow
import type { State, Props } from '../animate';

let style;
let transition;

type MountProps = { willUnmount: boolean, willMount: boolean };

const getTransitionDelay = ({ reverseDelaySeconds, startAnimation, played, delaySeconds }) => {
  if (reverseDelaySeconds && !startAnimation && played) {
    return ` ${reverseDelaySeconds}s`;
  } else if (delaySeconds) {
    return ` ${delaySeconds}s`;
  }
  return '';
};

export default function propsGenerator(
  {
    startAnimation,
    startStyle,
    endStyle,
    onCompleteStyle,
    durationSeconds = 0.3,
    reverseDelaySeconds,
    delaySeconds = 0,
    easeType = 'linear',
    className,
    transition: transitionValue,
    refCallback,
  }: Props,
  { willComplete, willEnter, willLeave, played }: State,
  mountProps: MountProps = {
    willUnmount: false,
    willMount: false,
  },
) {
  const { willUnmount, willMount } = mountProps;
  style = startStyle;
  transition =
    transitionValue ||
    `${durationSeconds}s all ${easeType}${getTransitionDelay({ reverseDelaySeconds, startAnimation, played, delaySeconds })}`;

  if (willMount) {
    style = willEnter ? endStyle : startStyle;
  } else if (willUnmount) {
    style = willLeave ? endStyle : startStyle;
  } else if (willComplete && onCompleteStyle) {
    style = onCompleteStyle;
    transition = null;
  } else if (startAnimation) {
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
    ...(refCallback
      ? {
        ref: (element: any): void => {
          if (element && refCallback) refCallback(element);
        },
      }
      : null),
  };
}

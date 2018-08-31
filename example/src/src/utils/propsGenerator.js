// @flow
import type { State, Props } from '../animate';

export default function propsGenerator(
  {
    play,
    startStyle,
    endStyle,
    onCompleteStyle,
    durationSeconds,
    delaySeconds,
    easing = 'linear',
    className,
    refCallback,
    unMount,
    reverseDurationSeconds,
    reverseDelaySeconds,
  }: Props,
  { willComplete }: State,
): Object {
  let style = startStyle;
  let transition = `all ${durationSeconds}s ${easing} ${delaySeconds}s`;

  if (!unMount) {
    if (willComplete && onCompleteStyle && play) {
      style = onCompleteStyle;
      transition = null;
    } else if (play) {
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

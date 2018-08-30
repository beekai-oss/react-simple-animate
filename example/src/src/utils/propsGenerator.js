// @flow
import type { State, Props } from '../animate';

export default function propsGenerator(
  {
    play,
    startStyle,
    endStyle,
    onCompleteStyle,
    durationSeconds = 0.3,
    delaySeconds = 0,
    easing = 'linear',
    className,
    refCallback,
  }: Props,
  { willComplete }: State,
): Object {
  let style = startStyle;
  let transition = `all ${durationSeconds}s ${easing} ${delaySeconds}s`;

  if (willComplete && onCompleteStyle && play) {
    style = onCompleteStyle;
    transition = null;
  } else if (play) {
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

// @flow
let style;

let transition;

export default function propsGenerator(props: any, state: any) {
  const {
    animationWillEnd,
    animationWillStart,
    animationWillComplete,
    animationWillEnter,
    animationWillLeave,
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
    easeType,
    className,
    transition: transitionValue,
    willUnmount,
    willMount,
  } = props;

  style = startStyle;
  transition = transitionValue || `${durationSeconds}s all ${easeType}`;

  if (willMount && startAnimation) {
    style = animationWillEnter ? endStyle : startStyle;
  } else if (willUnmount && startAnimation) {
    style = animationWillLeave ? endStyle : startStyle;
  } else if (!played && reverseDelaySeconds && !startAnimation) {
    style = animationWillStart ? startStyle : endStyle;
  } else if (
    animationWillComplete ||
    animationWillEnd ||
    (startAnimation && !delaySeconds)
  ) {
    if (onCompleteStyle && animationWillComplete) {
      style = onCompleteStyle;
      transition = null;
    } else {
      style = endStyle;
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
  };
}

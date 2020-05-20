import * as React from 'react';
import { AnimateContext } from './animateGroup';
import secToMs from './utils/secToMs';
import getSequenceId from './utils/getSequenceId';
import isUndefined from './utils/isUndefined';
import { AnimationProps } from './types';

export default function Animate(props: AnimationProps) {
  const {
    play,
    children,
    render,
    start,
    end,
    complete = '',
    onComplete,
    delay = 0,
    duration = 0.3,
    easeType = 'linear',
    sequenceId,
    sequenceIndex,
  } = props;
  const onCompleteTimeRef = React.useRef<any>();
  const [style, setStyle] = React.useState(start || {});
  const { register, animationStates = {} } = React.useContext(AnimateContext);
  const id = getSequenceId(sequenceIndex, sequenceId);

  React.useEffect(() => {
    if ((!isUndefined(sequenceIndex) && sequenceIndex >= 0) || sequenceId)
      register(props);
  }, []);

  React.useEffect(() => {
    const animationState = animationStates[id] || {};

    setStyle({
      ...(play || animationState.play ? end : start),
      transition: `all ${duration}s ${easeType} ${parseFloat(
        animationState.delay || delay,
      )}s`,
    });

    if (play && (complete || onComplete)) {
      onCompleteTimeRef.current = setTimeout(() => {
        complete && setStyle(complete);
        onComplete && onComplete();
      }, secToMs(parseFloat(animationState.delay || delay) + duration));
    }

    return () => {
      onCompleteTimeRef.current && clearTimeout(onCompleteTimeRef.current);
    };
  }, [
    id,
    animationStates,
    play,
    duration,
    easeType,
    delay,
    onComplete,
    start,
    end,
    complete,
  ]);

  return render ? render({ style }) : <div style={style}>{children}</div>;
}

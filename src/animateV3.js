// @flow
import React, { useEffect, useState, useRef, useContext } from 'react';
import msToSec from './utils/msToSec';
import { AnimateContext } from './animateGroup';
import type { AnimationStateType, AnimationType } from './types';

type Props = {
  children: any,
  render: style => any,
  onComplete: () => void,
  sequenceId: number,
  sequenceIndex: number,
  animationStates: AnimationStateType,
} & AnimationType;

export default function Animate(props: Props) {
  const {
    play,
    children,
    render,
    start,
    end,
    complete,
    onComplete,
    duration = 0.3,
    delay = 0,
    easeType = 'linear',
    ...rest
  } = props;
  const onCompleteTimeRef = useRef(null);
  const [style, setStyle] = useState(start);
  const { register } = useContext(AnimateContext);

  useEffect(() => {
    register(props);
  }, []);

  useEffect(() => {
    setStyle({
      ...(play ? end : start),
      transition: `all ${duration}s ${easeType} ${delay}s`,
    });

    if (play && (complete || onComplete)) {
      onCompleteTimeRef.current = setTimeout(() => {
        complete && setStyle(complete);
        onComplete();
      }, msToSec(parseFloat(delay) + parseFloat(duration)));
    }

    return () => onCompleteTimeRef.current && clearTimeout(onCompleteTimeRef.current);
  }, [play, duration, easeType, delay, onComplete, start, end, complete]);

  return render ? (
    render(style)
  ) : (
    <div style={style} {...rest}>
      {children}
    </div>
  );
}

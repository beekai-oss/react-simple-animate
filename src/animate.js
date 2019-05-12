// @flow
import React, { useEffect, useState, useRef, useContext } from 'react';
import { AnimateContext } from './animateGroup';
import msToSec from './utils/msToSec';
import type { AnimationStateType, AnimationType, Style } from './types';

export type Props = {
  complete?: Style,
  animationStates?: AnimationStateType,
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
    delay = 0,
    duration = 0.3,
    easeType = 'linear',
    sequenceId,
    sequenceIndex,
  } = props;
  const onCompleteTimeRef = useRef(null);
  const [style, setStyle] = useState(start);
  const { register, animationStates = {} } = useContext(AnimateContext);
  const id = sequenceIndex >= 0 ? sequenceIndex : sequenceId;

  useEffect(() => {
    if (sequenceIndex >= 0 || sequenceId) register(props);
  }, []);

  useEffect(() => {
    setStyle({
      ...(play || (animationStates[id] || {}).play ? end : start),
      transition: `all ${duration}s ${easeType} ${parseFloat((animationStates[id] || {}).delay || delay)}s`,
    });

    if (play && (complete || onComplete)) {
      onCompleteTimeRef.current = setTimeout(() => {
        complete && setStyle(complete);
        onComplete && onComplete();
      }, msToSec(parseFloat((animationStates[id] || {}).delay || delay) + parseFloat(duration)));
    }

    return () => onCompleteTimeRef.current && clearTimeout(onCompleteTimeRef.current);
  }, [id, animationStates, play, duration, easeType, delay, onComplete, start, end, complete]);

  return render ? render(style) : <div style={style}>{children}</div>;
}

// @flow
import React, { useEffect, useState, useRef, useContext } from 'react';
import { AnimateContext } from './animateGroupV3';
import msToSec from './utils/msToSec';

export type Style = { [string]: string | number };

export type AnimationType = {
  play?: boolean,
  start?: Style,
  end: Style,
  complete?: Style,
  overlay?: number,
  duration?: number,
  delay?: number,
  children?: any,
  forwardedRef?: any,
};

export type AnimationStateType = { [string | number]: AnimationType };

export type Props = {
  easeType?: string,
  tag?: string,
  complete?: any,
  className?: string,
  render?: any,
  sequenceId?: string,
  sequenceIndex?: number,
  register?: any => void,
  animationStates?: AnimationStateType,
} & AnimationType;

export type State = {
  willComplete: boolean,
  play: boolean,
};

export default function Animate(
  props: Props = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
    sequenceId: undefined,
    sequenceIndex: undefined,
    animationStates: undefined,
    start: {},
    end: {},
    play: undefined,
    onComplete: () => {},
  },
) {
  const {
    play,
    children,
    render,
    start,
    end,
    complete,
    onComplete,
    delay,
    duration,
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

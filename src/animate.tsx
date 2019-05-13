import * as React from 'react';
import { AnimateContext } from './animateGroup';
import msToSec from './utils/msToSec';
import { AnimationStateType, AnimationType, Style } from './types';

const { useEffect, useState, useRef, useContext } = React;

export type Props = {
  complete?: Style;
  onComplete?: () => void;
  animationStates?: AnimationStateType;
} & AnimationType;

export default function Animate(props: Props) {
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
  const onCompleteTimeRef = useRef({});
  const [style, setStyle] = useState(start);
  const { register, animationStates = {} } = useContext(AnimateContext);
  const id = (sequenceIndex && sequenceIndex >= 0 ? sequenceIndex : sequenceId) || 0;

  useEffect((): void => {
    if (sequenceIndex && sequenceIndex >= 0 || sequenceId) register(props);
  }, []);

  useEffect(
    (): any => {
      setStyle({
        ...(play || (animationStates[id] || {}).play ? end : start),
        transition: `all ${duration}s ${easeType} ${parseFloat((animationStates[id] || {}).delay || delay)}s`,
      });

      if (play && (complete || onComplete)) {
        onCompleteTimeRef.current = setTimeout((): void => {
          complete && setStyle(complete);
          onComplete && onComplete();
        }, msToSec(parseFloat((animationStates[id] || {}).delay || delay) + duration));
      }

      return (): void => {
        if (onCompleteTimeRef.current) {
          // @ts-ignore
          clearTimeout(onCompleteTimeRef.current);
        }
      };
    },
    [id, animationStates, play, duration, easeType, delay, onComplete, start, end, complete],
  );

  // @ts-ignore
  return render ? render({ style }) : <div style={style}>{children}</div>;
}

import * as React from 'react';
import { AnimateContext } from './animateGroup';
import msToSec from './utils/secToMs';
import { AnimationProps } from './types';
import getSequenceId from "./utils/getSequenceId";

const { useEffect, useState, useRef, useContext } = React;

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
  const onCompleteTimeRef = useRef(null);
  const [style, setStyle] = useState(start || {});
  const { register, animationStates = {} } = useContext(AnimateContext);
  const id = getSequenceId(sequenceIndex, sequenceId);

  useEffect((): void => {
    if ((sequenceIndex !== undefined && sequenceIndex >= 0) || sequenceId) register(props);
  }, []);

  useEffect(
    (): any => {
      setStyle({
        ...(play || (animationStates[id] || {}).play ? end : start),
        transition: `all ${duration}s ${easeType} ${parseFloat((animationStates[id] || {}).delay || delay)}s`,
      });

      if (play && (complete || onComplete)) {
        // @ts-ignore
        onCompleteTimeRef.current = setTimeout((): void => {
          complete && setStyle(complete);
          onComplete && onComplete();
        }, msToSec(parseFloat((animationStates[id] || {}).delay || delay) + duration));
      }

      return (): void => {
        // @ts-ignore
        onCompleteTimeRef.current && clearTimeout(onCompleteTimeRef.current);
      };
    },
    [id, animationStates, play, duration, easeType, delay, onComplete, start, end, complete],
  );

  return render ? render({ style }) : <div style={style}>{children}</div>;
}

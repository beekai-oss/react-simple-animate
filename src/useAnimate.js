// @flow
import { useState, useEffect, useRef } from 'react';
import type { Props } from './animate';
import msToSec from './utils/msToSec';

export default function useAnimate(props: Props) {
  const { play, start, end, complete, onComplete, delay = 0, duration = 0.3, easeType = 'linear' } = props;
  const [style, setStyle] = useState(start);
  const onCompleteTimeRef = useRef(null);

  useEffect(() => {
    setStyle({
      ...(play.play ? end : start),
      transition: `all ${duration}s ${easeType} ${delay}s`,
    });

    if (play && (complete || onComplete)) {
      onCompleteTimeRef.current = setTimeout(() => {
        complete && setStyle(complete);
        onComplete && onComplete();
      }, msToSec(delay + parseFloat(duration)));
    }

    return () => onCompleteTimeRef.current && clearTimeout(onCompleteTimeRef.current);
  }, [play, duration, easeType, delay, onComplete, start, end, complete]);

  return {
    style,
    play,
  };
}

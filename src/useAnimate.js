// @flow
import { useState, useEffect, useRef } from 'react';
import type { Props } from './animate';
import msToSec from './utils/msToSec';

export default function useAnimate(props: Props) {
  const { start, end, complete, onComplete, delay = 0, duration = 0.3, easeType = 'linear' } = props;
  const transition = `all ${duration}s ${easeType} ${delay}s`;
  const [style, setStyle] = useState({ ...start, transition });
  const [isPlaying, setIsPlaying] = useState(false);
  const onCompleteTimeRef = useRef(null);

  useEffect(() => () => onCompleteTimeRef.current && clearTimeout(onCompleteTimeRef.current), []);

  const play = (isPlay: boolean) => {
    setStyle({
      ...(isPlay ? end : start),
      transition,
    });

    setIsPlaying(isPlay);

    if (isPlay && (complete || onComplete)) {
      onCompleteTimeRef.current = setTimeout(() => {
        complete && setStyle(complete);
        onComplete && onComplete();
      }, msToSec(delay + parseFloat(duration)));
    }
  };

  return {
    isPlaying,
    style,
    play,
  };
}

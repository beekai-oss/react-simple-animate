import { useState, useEffect, useRef } from 'react';
import { AnimationProps } from './types';
import msToSec from './utils/secToMs';

export default function useAnimate(props: AnimationProps) {
  const { start, end, complete, onComplete, delay = 0, duration = 0.3, easeType = 'linear' } = props;
  const transition = `all ${duration}s ${easeType} ${delay}s`;
  const [style, setStyle] = useState({ ...start, transition });
  const [isPlaying, setIsPlaying] = useState(false);
  const onCompleteTimeRef = useRef<number>(0);

  useEffect(
    (): any => (): void => {
      onCompleteTimeRef.current && clearTimeout(onCompleteTimeRef.current);
    },
    [],
  );

  const play = (isPlay: boolean) => {
    setStyle({
      ...(isPlay ? end : start),
      transition,
    });

    setIsPlaying(isPlay);

    if (isPlay && (complete || onComplete)) {
      // @ts-ignore
      onCompleteTimeRef.current = setTimeout(() => {
        // @ts-ignore
        complete && setStyle(complete);
        onComplete && onComplete();
      }, msToSec(delay + duration));
    }
  };

  return {
    isPlaying,
    style,
    play,
  };
}

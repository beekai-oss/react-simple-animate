import { useState, useEffect, useRef } from 'react';
import { Props } from './animate';
import msToSec from './utils/msToSec';

export default function useAnimate(props: Props) {
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

import * as React from 'react';
import msToSec from './utils/secToMs';
import { AnimationProps, Style } from './types';

const { useState, useEffect, useRef } = React;

export default function useAnimate(
  props: AnimationProps,
): {
  isPlaying: boolean;
  style: Style;
  play: (boolean) => void;
} {
  const {
    start,
    end,
    complete,
    onComplete,
    delay = 0,
    duration = 0.3,
    easeType = 'linear',
  } = props;
  const transition = `all ${duration}s ${easeType} ${delay}s`;
  const [style, setStyle] = useState<Style>({ ...start, transition });
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
      onCompleteTimeRef.current = setTimeout((): void => {
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

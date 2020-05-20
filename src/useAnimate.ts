import * as React from 'react';
import secToMs from './utils/secToMs';
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
  const transition = React.useMemo(
    () => `all ${duration}s ${easeType} ${delay}s`,
    [duration, easeType, delay],
  );
  const [style, setStyle] = useState<Style>({ ...start, transition });
  const [isPlaying, setIsPlaying] = useState(false);
  const onCompleteTimeRef = useRef<NodeJS.Timeout>();
  const onCompleteCallbackRef = useRef<(() => void) | undefined>(onComplete);
  const playRef = useRef<(isPlay: boolean) => void>();

  useEffect(() => {
    onCompleteCallbackRef.current = onComplete;
  }, [onComplete]);

  useEffect(
    () => () => {
      onCompleteTimeRef.current && clearTimeout(onCompleteTimeRef.current);
    },
    [],
  );

  if (!playRef.current) {
    playRef.current = (isPlay: boolean) => {
      setStyle({
        ...(isPlay ? end : start),
        transition,
      });

      setIsPlaying(true);

      onCompleteTimeRef.current = setTimeout((): void => {
        if (isPlay && (complete || onComplete)) {
          complete && setStyle(complete);
          onCompleteCallbackRef.current && onCompleteCallbackRef.current();
        }
        setIsPlaying(false);
      }, secToMs(delay + duration));
    };
  }

  return {
    isPlaying,
    style,
    play: playRef.current,
  };
}

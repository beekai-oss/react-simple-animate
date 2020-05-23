import * as React from 'react';
import secToMs from './utils/secToMs';
import { AnimationProps, Style } from './types';
import { ALL, DEFAULT_DURATION, DEFAULT_EASE_TYPE } from './constants';

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
    duration = DEFAULT_DURATION,
    easeType = DEFAULT_EASE_TYPE,
  } = props;
  const transition = React.useMemo(
    () => `${ALL} ${duration}s ${easeType} ${delay}s`,
    [duration, easeType, delay],
  );
  const [style, setStyle] = React.useState<Style>({ ...start, transition });
  const [isPlaying, setIsPlaying] = React.useState(false);
  const onCompleteTimeRef = React.useRef<NodeJS.Timeout>();
  const onCompleteCallbackRef = React.useRef<(() => void) | undefined>(
    onComplete,
  );
  const playRef = React.useRef<(isPlay: boolean) => void>();

  React.useEffect(() => {
    onCompleteCallbackRef.current = onComplete;
  }, [onComplete]);

  React.useEffect(
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

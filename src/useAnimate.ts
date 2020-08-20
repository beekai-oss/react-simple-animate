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
  const [animate, setAnimate] = React.useState<{
    isPlaying: boolean;
    style: Style;
  }>({
    isPlaying: false,
    style: { ...start, transition },
  });
  const { isPlaying, style } = animate;
  const onCompleteTimeRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if ((onCompleteTimeRef.current || complete) && isPlaying) {
      onCompleteTimeRef.current = setTimeout((): void => {
        if (onComplete) {
          onComplete();
        }

        if (complete) {
          setAnimate({
            ...animate,
            style: complete,
          });
        }
      }, secToMs(delay + duration));
    }

    return () =>
      onCompleteTimeRef.current && clearTimeout(onCompleteTimeRef.current);
  }, [isPlaying]);

  return {
    isPlaying,
    style,
    play: React.useCallback((isPlaying: boolean) => {
      setAnimate({
        ...animate,
        style: {
          ...(isPlaying ? end : start),
          transition,
        },
        isPlaying,
      });
    }, []),
  };
}

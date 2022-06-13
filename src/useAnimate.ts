import * as React from 'react';
import secToMs from './utils/secToMs';
import { AnimationProps } from './types';
import { ALL, DEFAULT_DURATION, DEFAULT_EASE_TYPE } from './constants';

type UseAnimateProps = Pick<
  AnimationProps,
  | 'start'
  | 'end'
  | 'complete'
  | 'onComplete'
  | 'delay'
  | 'duration'
  | 'easeType'
>;
export default function useAnimate(props: UseAnimateProps): {
  isPlaying: boolean;
  style: React.CSSProperties;
  play: (isPlaying: boolean) => void;
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
    style: React.CSSProperties;
  }>({
    isPlaying: false,
    style: { ...start, transition },
  });
  const { isPlaying, style } = animate;
  const onCompleteTimeRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if ((onCompleteTimeRef.current || complete) && isPlaying) {
      onCompleteTimeRef.current = setTimeout(() => {
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
    play: React.useCallback((isPlaying) => {
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

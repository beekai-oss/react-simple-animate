import * as React from 'react';
import { ALL, DEFAULT_DURATION, DEFAULT_EASE_TYPE } from './constants';
import type { AnimationProps } from './types';

type UseAnimateProps = Pick<
  AnimationProps,
  | 'start'
  | 'end'
  | 'complete'
  | 'onStart'
  | 'onCancel'
  | 'onComplete'
  | 'delay'
  | 'duration'
  | 'easeType'
>;
export default function useAnimate(props: UseAnimateProps): {
  isPlaying: boolean;
  style: React.CSSProperties;
  play: (isPlaying: boolean) => void;
  cancel: () => void;
  onTransitionStart: React.TransitionEventHandler<HTMLElement>;
  onTransitionEnd: React.TransitionEventHandler<HTMLElement>;
  onTransitionCancel: React.TransitionEventHandler<HTMLElement>;
} {
  const {
    start,
    end,
    complete,
    onStart,
    onCancel,
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
  const hasStartedRef = React.useRef(false);
  const hasCompletedRef = React.useRef(false);
  const hasCancelledRef = React.useRef(false);
  const cancelRequestedRef = React.useRef(false);

  const onTransitionStart: React.TransitionEventHandler<HTMLElement> = (
    event,
  ) => {
    if (
      event.target === event.currentTarget &&
      !hasStartedRef.current &&
      !hasCancelledRef.current &&
      !cancelRequestedRef.current
    ) {
      hasStartedRef.current = true;
      onStart?.();
    }
  };
  const onTransitionEnd: React.TransitionEventHandler<HTMLElement> = (
    event,
  ) => {
    if (
      event.target === event.currentTarget &&
      isPlaying &&
      !hasCompletedRef.current &&
      !hasCancelledRef.current &&
      !cancelRequestedRef.current
    ) {
      hasCompletedRef.current = true;
      if (complete) {
        setAnimate((animate) => ({ ...animate, style: complete }));
      }
      onComplete?.();
    }
  };
  const onTransitionCancel: React.TransitionEventHandler<HTMLElement> = (
    event,
  ) => {
    if (
      event.target === event.currentTarget &&
      !hasCompletedRef.current &&
      !hasCancelledRef.current
    ) {
      hasCancelledRef.current = true;
      onCancel?.();
    }
  };

  return {
    isPlaying,
    style,
    play: React.useCallback(
      (isPlaying) => {
        hasStartedRef.current = false;
        hasCompletedRef.current = false;
        hasCancelledRef.current = false;
        cancelRequestedRef.current = false;
        setAnimate((animate) => ({
          ...animate,
          style: {
            ...(isPlaying ? end : start),
            transition,
          },
          isPlaying,
        }));
      },
      [end, start, transition],
    ),
    cancel: React.useCallback(() => {
      cancelRequestedRef.current = true;
      setAnimate((animate) => ({
        ...animate,
        style: {
          ...animate.style,
          transition: 'none',
        },
      }));
    }, []),
    onTransitionStart,
    onTransitionEnd,
    onTransitionCancel,
  };
}

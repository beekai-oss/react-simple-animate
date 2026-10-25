import * as React from 'react';
import { AnimateContext } from './animateGroup';
import {
  DEFAULT_DIRECTION,
  DEFAULT_DURATION,
  DEFAULT_EASE_TYPE,
  DEFAULT_FILLMODE,
} from './constants';
import createTag from './logic/createTag';
import deleteRules from './logic/deleteRules';
import type { AnimateKeyframesProps } from './types';
import createRandomName from './utils/createRandomName';
import getPlayState from './utils/getPauseState';

type UseAnimationKeyframesProps = Pick<
  AnimateKeyframesProps,
  | 'duration'
  | 'delay'
  | 'easeType'
  | 'direction'
  | 'fillMode'
  | 'iterationCount'
  | 'keyframes'
  | 'onStart'
  | 'onComplete'
  | 'onCancel'
>;
export default function useAnimateKeyframes(
  props: UseAnimationKeyframesProps,
): {
  style: React.CSSProperties;
  play: (isPlaying: boolean) => void;
  pause: (isPaused: boolean) => void;
  cancel: () => void;
  isPlaying: boolean;
  onAnimationStart: React.AnimationEventHandler<HTMLElement>;
  onAnimationEnd: React.AnimationEventHandler<HTMLElement>;
  onAnimationCancel: React.AnimationEventHandler<HTMLElement>;
} {
  const {
    duration = DEFAULT_DURATION,
    delay = 0,
    easeType = DEFAULT_EASE_TYPE,
    direction = DEFAULT_DIRECTION,
    fillMode = DEFAULT_FILLMODE,
    iterationCount = 1,
    keyframes,
    onStart,
    onComplete,
    onCancel,
  } = props;
  const animationNameRef = React.useRef({
    forward: '',
    reverse: '',
  });
  const styleTagRef = React.useRef<
    Record<'forward' | 'reverse', HTMLStyleElement | null>
  >({
    forward: null,
    reverse: null,
  });
  const { register } = React.useContext(AnimateContext);
  const [isPlaying, setIsPlaying] = React.useState<boolean | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isCancelled, setIsCancelled] = React.useState(false);
  const isActiveRef = React.useRef(false);
  const hasStartedRef = React.useRef(false);
  const hasCompletedRef = React.useRef(false);
  const hasCancelledRef = React.useRef(false);
  const cancelRequestedRef = React.useRef(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: animation style tags are created once on mount
  React.useEffect(() => {
    const styleTag = styleTagRef.current;
    const animationName = animationNameRef.current;

    animationNameRef.current.forward = createRandomName();
    let result = createTag({
      animationName: animationNameRef.current.forward,
      keyframes,
    });
    styleTagRef.current.forward = result.styleTag;

    animationNameRef.current.reverse = createRandomName();
    result = createTag({
      animationName: animationNameRef.current.reverse,
      keyframes: [...keyframes].reverse() as typeof keyframes,
    });
    styleTagRef.current.reverse = result.styleTag;

    register(props);

    return () => {
      deleteRules(styleTag.forward?.sheet, animationName.forward);
      deleteRules(styleTag.reverse?.sheet, animationName.reverse);
    };
  }, []);

  const style = {
    animation: isCancelled
      ? 'none'
      : `${duration}s ${easeType} ${delay}s ${iterationCount} ${direction} ${fillMode} ${getPlayState(
          isPaused,
        )} ${
          isPlaying === null
            ? ''
            : isPlaying
              ? animationNameRef.current.forward
              : animationNameRef.current.reverse
        }`,
  };

  const activeAnimationName = isCancelled
    ? ''
    : isPlaying === null
      ? ''
      : isPlaying
        ? animationNameRef.current.forward
        : animationNameRef.current.reverse;

  const onAnimationStart: React.AnimationEventHandler<HTMLElement> = (
    event,
  ) => {
    if (
      event.target === event.currentTarget &&
      event.animationName === activeAnimationName &&
      !hasStartedRef.current &&
      !cancelRequestedRef.current
    ) {
      hasStartedRef.current = true;
      onStart?.();
    }
  };
  const onAnimationEnd: React.AnimationEventHandler<HTMLElement> = (event) => {
    if (
      event.target === event.currentTarget &&
      event.animationName === activeAnimationName &&
      !hasCompletedRef.current &&
      !cancelRequestedRef.current
    ) {
      hasCompletedRef.current = true;
      isActiveRef.current = false;
      onComplete?.();
    }
  };
  const onAnimationCancel: React.AnimationEventHandler<HTMLElement> = (
    event,
  ) => {
    const isOwnedAnimation =
      event.animationName === animationNameRef.current.forward ||
      event.animationName === animationNameRef.current.reverse;

    if (
      event.target === event.currentTarget &&
      isOwnedAnimation &&
      !hasCancelledRef.current
    ) {
      hasCancelledRef.current = true;
      isActiveRef.current = false;
      onCancel?.();
    }
  };

  const play = React.useCallback((shouldPlay: boolean) => {
    isActiveRef.current = true;
    hasStartedRef.current = false;
    hasCompletedRef.current = false;
    hasCancelledRef.current = false;
    cancelRequestedRef.current = false;
    setIsCancelled(false);
    setIsPlaying(shouldPlay);
  }, []);

  const cancel = React.useCallback(() => {
    if (isActiveRef.current && !hasCancelledRef.current) {
      cancelRequestedRef.current = true;
      setIsCancelled(true);
    }
    isActiveRef.current = false;
  }, []);

  return {
    style,
    play,
    pause: setIsPaused,
    cancel,
    isPlaying: !!isPlaying,
    onAnimationStart,
    onAnimationEnd,
    onAnimationCancel,
  };
}

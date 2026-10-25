import * as React from 'react';
import { AnimateContext } from './animateGroup';
import {
  DEFAULT_DIRECTION,
  DEFAULT_DURATION,
  DEFAULT_EASE_TYPE,
  DEFAULT_FILLMODE,
} from './constants';
import createTag from './logic/createTag';
import deleteRule from './logic/deleteRules';
import type { AnimateKeyframesProps } from './types';
import createRandomName from './utils/createRandomName';
import getPlayState from './utils/getPauseState';
import getSequenceId from './utils/getSequenceId';

export default function AnimateKeyframes(
  props: AnimateKeyframesProps,
): React.ReactElement {
  const {
    children,
    play = false,
    pause = false,
    render,
    onStart,
    onComplete,
    onCancel,
    cancel = false,
    duration = DEFAULT_DURATION,
    delay = 0,
    easeType = DEFAULT_EASE_TYPE,
    direction = DEFAULT_DIRECTION,
    fillMode = DEFAULT_FILLMODE,
    iterationCount = 1,
    sequenceIndex,
    keyframes,
    sequenceId,
  } = props;
  let pauseValue: boolean | undefined;
  const animationNameRef = React.useRef({
    forward: '',
    reverse: '',
  });
  const controlled = React.useRef(false);
  const hasStartedRef = React.useRef(false);
  const hasCompletedRef = React.useRef(false);
  const hasCancelledRef = React.useRef(false);
  const runAnimationNameRef = React.useRef('');
  const styleTagRef = React.useRef<
    Record<'forward' | 'reverse', HTMLStyleElement | null>
  >({
    forward: null,
    reverse: null,
  });
  const id = getSequenceId(sequenceIndex, sequenceId);
  const { register, animationStates = {} } = React.useContext(AnimateContext);
  const animateState = animationStates[id] || {};
  const isCancelled = cancel || animateState.cancel;
  const [, forceUpdate] = React.useState(false);

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

    if (play) {
      forceUpdate(true);
    }

    return () => {
      deleteRule(styleTag.forward?.sheet, animationName.forward);
      deleteRule(styleTag.reverse?.sheet, animationName.reverse);
    };
  }, []);

  if (animateState.controlled && !controlled.current) {
    pauseValue = animateState.pause;
    if (!animateState.pause) {
      controlled.current = true;
    }
  } else {
    pauseValue = pause;
  }

  const activeAnimationName = isCancelled
    ? ''
    : (animateState.controlled ? animateState.play : play)
      ? animationNameRef.current.forward
      : animationNameRef.current.reverse;

  const style = {
    animation: isCancelled
      ? 'none'
      : `${duration}s ${easeType} ${
          animateState.delay || delay
        }s ${iterationCount} ${direction} ${fillMode} ${getPlayState(pauseValue)} ${
          activeAnimationName || ''
        }`,
  };

  const handleAnimationStart: React.AnimationEventHandler<HTMLElement> = (
    event,
  ) => {
    if (
      event.target === event.currentTarget &&
      event.animationName === activeAnimationName
    ) {
      resetRunState(event.animationName);
      if (hasStartedRef.current || hasCancelledRef.current) {
        return;
      }
      hasStartedRef.current = true;
      onStart?.();
    }
  };
  const handleAnimationEnd: React.AnimationEventHandler<HTMLElement> = (
    event,
  ) => {
    if (
      event.target === event.currentTarget &&
      event.animationName === activeAnimationName
    ) {
      resetRunState(event.animationName);
      if (hasCompletedRef.current || hasCancelledRef.current) {
        return;
      }
      hasCompletedRef.current = true;
      onComplete?.();
    }
  };
  const handleAnimationCancel: React.AnimationEventHandler<HTMLElement> = (
    event,
  ) => {
    if (
      event.target === event.currentTarget &&
      (event.animationName === animationNameRef.current.forward ||
        event.animationName === animationNameRef.current.reverse)
    ) {
      resetRunState(event.animationName);
      if (hasCompletedRef.current || hasCancelledRef.current) {
        return;
      }
      hasCancelledRef.current = true;
      onCancel?.();
    }
  };

  function resetRunState(animationName: string) {
    if (runAnimationNameRef.current !== animationName) {
      runAnimationNameRef.current = animationName;
      hasStartedRef.current = false;
      hasCompletedRef.current = false;
      hasCancelledRef.current = false;
    }
  }

  const handlers = {
    onAnimationStart: handleAnimationStart,
    onAnimationEnd: handleAnimationEnd,
    onAnimationCancel: handleAnimationCancel,
  };

  return render ? (
    render({ style, ...handlers })
  ) : (
    <div style={style} {...handlers}>
      {children}
    </div>
  );
}

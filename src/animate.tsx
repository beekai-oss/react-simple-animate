import * as React from 'react';
import { AnimateContext } from './animateGroup';
import { ALL, DEFAULT_DURATION, DEFAULT_EASE_TYPE } from './constants';
import type { AnimationProps } from './types';
import getSequenceId from './utils/getSequenceId';
import isUndefined from './utils/isUndefined';

export default function Animate(props: AnimationProps): React.ReactElement {
  const {
    play,
    children,
    render,
    onStart,
    onCancel,
    cancel = false,
    start,
    end,
    complete = '',
    onComplete,
    delay = 0,
    duration = DEFAULT_DURATION,
    easeType = DEFAULT_EASE_TYPE,
    transitionProperty = ALL,
    sequenceId,
    sequenceIndex,
  } = props;
  const hasStartedRef = React.useRef(false);
  const hasCompletedRef = React.useRef(false);
  const hasCancelledRef = React.useRef(false);
  const [style, setStyle] = React.useState(start || {});
  const { register, animationStates = {} } = React.useContext(AnimateContext);
  const id = getSequenceId(sequenceIndex, sequenceId);

  // biome-ignore lint/correctness/useExhaustiveDependencies: registration only happens on mount
  React.useEffect(() => {
    if ((!isUndefined(sequenceIndex) && sequenceIndex >= 0) || sequenceId) {
      register(props);
    }
  }, []);

  React.useEffect(() => {
    const animationState = animationStates[id] || {};
    const isCancelled = cancel || animationState.cancel;

    hasStartedRef.current = false;
    hasCompletedRef.current = false;
    hasCancelledRef.current = false;

    setStyle({
      ...(play || animationState.play ? end : start),
      transition: isCancelled
        ? 'none'
        : `${transitionProperty} ${duration}s ${easeType} ${animationState.delay || delay}s`,
    });
  }, [
    id,
    animationStates,
    play,
    duration,
    easeType,
    transitionProperty,
    delay,
    start,
    end,
    cancel,
  ]);

  const handleTransitionStart: React.TransitionEventHandler<HTMLElement> = (
    event,
  ) => {
    if (
      event.target === event.currentTarget &&
      !hasStartedRef.current &&
      !hasCancelledRef.current
    ) {
      hasStartedRef.current = true;
      onStart?.();
    }
  };
  const handleTransitionEnd: React.TransitionEventHandler<HTMLElement> = (
    event,
  ) => {
    if (
      event.target === event.currentTarget &&
      !hasCompletedRef.current &&
      !hasCancelledRef.current
    ) {
      hasCompletedRef.current = true;
      if (complete) {
        setStyle(complete);
      }
      onComplete?.();
    }
  };
  const handleTransitionCancel: React.TransitionEventHandler<HTMLElement> = (
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

  const handlers = {
    onTransitionStart: handleTransitionStart,
    onTransitionEnd: handleTransitionEnd,
    onTransitionCancel: handleTransitionCancel,
  };

  return render ? (
    render({ style, ...handlers })
  ) : (
    <div style={style} {...handlers}>
      {children}
    </div>
  );
}

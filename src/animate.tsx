import * as React from 'react';
import { AnimateContext } from './animateGroup';
import { ALL, DEFAULT_DURATION, DEFAULT_EASE_TYPE } from './constants';
import type { AnimationProps } from './types';
import getSequenceId from './utils/getSequenceId';
import isUndefined from './utils/isUndefined';
import secToMs from './utils/secToMs';

export default function Animate(props: AnimationProps): React.ReactElement {
  const {
    play,
    children,
    render,
    start,
    end,
    complete = '',
    onComplete,
    delay = 0,
    duration = DEFAULT_DURATION,
    easeType = DEFAULT_EASE_TYPE,
    sequenceId,
    sequenceIndex,
  } = props;
  const onCompleteTimeRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
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

    setStyle({
      ...(play || animationState.play ? end : start),
      transition: `${ALL} ${duration}s ${easeType} ${
        animationState.delay || delay
      }s`,
    });

    if (play && (complete || onComplete)) {
      onCompleteTimeRef.current = setTimeout(
        () => {
          complete && setStyle(complete);
          onComplete?.();
        },
        secToMs((animationState.delay || delay) + duration),
      );
    }

    return () => {
      if (onCompleteTimeRef.current) {
        clearTimeout(onCompleteTimeRef.current);
      }
    };
  }, [
    id,
    animationStates,
    play,
    duration,
    easeType,
    delay,
    onComplete,
    start,
    end,
    complete,
  ]);

  return render ? render({ style }) : <div style={style}>{children}</div>;
}

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
  const styleTagRef = React.useRef<
    Record<'forward' | 'reverse', HTMLStyleElement | null>
  >({
    forward: null,
    reverse: null,
  });
  const id = getSequenceId(sequenceIndex, sequenceId);
  const { register, animationStates = {} } = React.useContext(AnimateContext);
  const animateState = animationStates[id] || {};
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

  const style = {
    animation: `${duration}s ${easeType} ${
      animateState.delay || delay
    }s ${iterationCount} ${direction} ${fillMode} ${getPlayState(pauseValue)} ${
      ((animateState.controlled ? animateState.play : play)
        ? animationNameRef.current.forward
        : animationNameRef.current.reverse) || ''
    }`,
  };

  return render ? render({ style }) : <div style={style || {}}>{children}</div>;
}

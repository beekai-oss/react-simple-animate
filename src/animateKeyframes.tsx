import * as React from 'react';
import createTag from './logic/createTag';
import createRandomName from './utils/createRandomName';
import deleteRule from './logic/deleteRules';
import { AnimateContext } from './animateGroup';
import getSequenceId from './utils/getSequenceId';
import { AnimateKeyframesProps } from './types';
import getPlayState from './utils/getPauseState';

const { useRef, useEffect, useContext, useState } = React;

export default function AnimateKeyframes(props: AnimateKeyframesProps) {
  const {
    children,
    play = false,
    pause = false,
    render,
    duration = 0.3,
    delay = 0,
    easeType = 'linear',
    direction = 'normal',
    fillMode = 'none',
    iterationCount = 1,
    sequenceIndex,
    keyframes,
    sequenceId,
  } = props;
  const animationNameRef = useRef({
    forward: '',
    reverse: '',
  });
  const controlled = useRef(false);
  const styleTagRef = useRef({
    forward: { sheet: {} },
    reverse: { sheet: {} },
  });
  const id = getSequenceId(sequenceIndex, sequenceId);
  const { register, animationStates = {} } = useContext(AnimateContext);
  const forceUpdate = useState(false)[1];

  useEffect(() => {
    animationNameRef.current.forward = createRandomName();
    let result = createTag({
      animationName: animationNameRef.current.forward,
      keyframes,
    });
    styleTagRef.current.forward = result.styleTag;

    animationNameRef.current.reverse = createRandomName();
    result = createTag({
      animationName: animationNameRef.current.reverse,
      keyframes: keyframes.reverse(),
    });
    styleTagRef.current.reverse = result.styleTag;
    register(props);

    if (play) forceUpdate(true);
    return (): void => {
      deleteRule(styleTagRef.current.forward.sheet, animationNameRef.current.forward);
      deleteRule(styleTagRef.current.reverse.sheet, animationNameRef.current.reverse);
    };
  }, []);

  const animateState = animationStates[id] || {};
  let pauseValue = false;

  if (animateState.controlled && !controlled.current) {
    pauseValue = animateState.pause;
    if (!animateState.pause) controlled.current = true;
  } else {
    pauseValue = pause;
  }

  const style = {
    animation: `${duration}s ${easeType} ${animateState.delay ||
      delay}s ${iterationCount} ${direction} ${fillMode} ${getPlayState(pauseValue)} ${((animateState.controlled
    ? animateState.play
    : play)
      ? animationNameRef.current.forward
      : animationNameRef.current.reverse) || ''}`,
  };

  return render ? render({ style }) : <div style={style || {}}>{children}</div>;
}

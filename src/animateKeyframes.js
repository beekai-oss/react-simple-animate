// @flow
import React, { useRef, useEffect, useContext, useState } from 'react';
import createTag from './style/createTag';
import createRandomName from './utils/createRandomName';
import deleteRule from './style/deleteRules';
import { AnimateContext } from './animateGroup';
import type { AnimationStateType } from './animate';
import type { AnimationType } from './types';

export type Keyframes = Array<Object>;

export type Props = {
  keyframes: Keyframes,
  playState?: string,
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse',
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both',
  iterationCount?: string | number,
  animationStates: AnimationStateType,
} & AnimationType;

export default function AnimateKeyframesChild(props: Props) {
  const {
    children,
    play,
    render,
    duration = 0.3,
    delay = 0,
    easeType = 'linear',
    playState = 'running',
    direction = 'normal',
    fillMode = 'none',
    iterationCount = 1,
    keyframes,
  } = props;
  const animationNameRef = useRef('');
  const styleTagRef = useRef('');
  const { register } = useContext(AnimateContext);
  const forceUpdate = useState(false)[1];

  useEffect(() => {
    animationNameRef.current = createRandomName();
    const { styleTag } = createTag({
      animationName: animationNameRef.current,
      keyframes,
    });
    styleTagRef.current = styleTag;
    register(props);

    if (play) forceUpdate(true);

    return () => deleteRule(styleTagRef.current.sheet, animationNameRef.current);
  }, []);

  const style = play
    ? {
        animation: `${duration}s ${easeType} ${delay}s ${iterationCount} ${direction} ${fillMode} ${playState} ${
          animationNameRef.current
        }`,
      }
    : null;

  return render ? render({ style }) : <div style={style}>{children}</div>;
}

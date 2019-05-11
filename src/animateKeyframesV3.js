// @flow
import React, { useRef, useEffect, useContext } from 'react';
import createTag from './style/createTag';
import createRandomName from './utils/createRandomName';
import { AnimateContext } from './animateGroup';
import deleteRule from './style/deleteRules';
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
  children?: any,
  register?: any => void,
  sequenceId?: string,
  sequenceIndex?: number,
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

  useEffect(() => {
    animationNameRef.current = createRandomName();
    const { styleTag } = createTag({ animationName: this.animationName, keyframes });
    styleTagRef.current = styleTag;
    register(props);

    return () => {
      deleteRule(styleTagRef.sheet, animationNameRef.current);
    };
  }, []);

  const style = play
    ? {
        animation: `${duration}s ${easeType} ${delay}s ${iterationCount} ${direction} ${fillMode} ${playState} ${
          animationNameRef.current
        }`,
      }
    : null;

  return render ? render({ style }) : <div {...(style ? { style } : null)}>{children}</div>;
}

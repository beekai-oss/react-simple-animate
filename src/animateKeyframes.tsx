import * as React from 'react';
import createTag from './logic/createTag';
import createRandomName from './utils/createRandomName';
import deleteRule from './logic/deleteRules';
import { AnimateContext } from './animateGroup';
import getSequenceId from './utils/getSequenceId';
import { AnimateKeyframesProps } from './types';
import getPlayState from './utils/getPlayState';

const { useRef, useEffect, useContext, useState } = React;

export default function AnimateKeyframes(props: AnimateKeyframesProps) {
  const {
    children,
    play,
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
  const animationNameRef = useRef('');
  const id = getSequenceId(sequenceIndex, sequenceId);
  const styleTagRef = useRef({
    sheet: {},
  });
  const { register, animationStates = {} } = useContext(AnimateContext);
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
    return (): void => deleteRule(styleTagRef.current.sheet, animationNameRef.current);
  }, []);

  const style = {
    animation: `${duration}s ${easeType} ${delay}s ${iterationCount} ${direction} ${fillMode} ${getPlayState(
      (animationStates[id] || {}).play || play,
    )} ${animationNameRef.current || ''}`,
  };

  return render ? render({ style }) : <div style={style || {}}>{children}</div>;
}

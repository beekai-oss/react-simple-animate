import * as React from 'react';
import { AnimateContext } from './animateGroup';
import createTag from './logic/createTag';
import deleteRule from './logic/deleteRules';
import createRandomName from './utils/createRandomName';
import getSequenceId from './utils/getSequenceId';
import getPlayState from './utils/getPauseState';
import {
  DEFAULT_DIRECTION,
  DEFAULT_DURATION,
  DEFAULT_EASE_TYPE,
  DEFAULT_FILLMODE,
} from './constants';
import { AnimateKeyframesProps } from './types';

export default function AnimateKeyframes(props: AnimateKeyframesProps) {
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
  let pauseValue;
  const animationNameRef = React.useRef({
    forward: '',
    reverse: '',
  });
  const controlled = React.useRef(false);
  const styleTagRef = React.useRef({
    forward: { sheet: {} },
    reverse: { sheet: {} },
  });
  const id = getSequenceId(sequenceIndex, sequenceId);
  const { register, animationStates = {} } = React.useContext(AnimateContext);
  const animateState = animationStates[id] || {};
  const [, forceUpdate] = React.useState(false);

  React.useEffect(() => {
    const styleTag = styleTagRef.current;
    const animationName = animationNameRef.current;
    animationNameRef.current.forward = createRandomName();
    let result = createTag({
      animationName: animationNameRef.current.forward,
      keyframes,
    });

    animationNameRef.current.reverse = createRandomName();
    styleTagRef.current.forward = result.styleTag;
    result = createTag({
      animationName: animationNameRef.current.reverse,
      keyframes: keyframes.reverse(),
    });
    styleTagRef.current.reverse = result.styleTag;

    register(props);

    if (play) {
      forceUpdate(true);
    }

    return () => {
      deleteRule(styleTag.forward.sheet, animationName.forward);
      deleteRule(styleTag.reverse.sheet, animationName.reverse);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

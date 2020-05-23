import * as React from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './logic/createTag';
import { AnimateContext } from './animateGroup';
import deleteRules from './logic/deleteRules';
import { AnimateKeyframesProps, Style } from './types';
import getPlayState from './utils/getPauseState';
import {
  DEFAULT_DIRECTION,
  DEFAULT_DURATION,
  DEFAULT_EASE_TYPE,
  DEFAULT_FILLMODE,
} from './constants';

export default function useAnimateKeyframes(
  props: AnimateKeyframesProps,
): {
  style: Style;
  play: (boolean) => void;
  pause: (boolean) => void;
  isPlaying: boolean;
} {
  const {
    duration = DEFAULT_DURATION,
    delay = 0,
    easeType = DEFAULT_EASE_TYPE,
    direction = DEFAULT_DIRECTION,
    fillMode = DEFAULT_FILLMODE,
    iterationCount = 1,
    keyframes,
  } = props;
  const animationNameRef = React.useRef({
    forward: '',
    reverse: '',
  });
  const styleTagRef = React.useRef({
    forward: { sheet: {} },
    reverse: { sheet: {} },
  });
  const { register } = React.useContext(AnimateContext);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isPaused, setIsPaused] = React.useState(false);
  const playRef = React.useRef<(isPlay: boolean) => void>();

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
      keyframes: keyframes.reverse(),
    });
    styleTagRef.current.reverse = result.styleTag;
    register(props);

    return () => {
      deleteRules(styleTag.forward.sheet, animationName.forward);
      deleteRules(styleTag.reverse.sheet, animationName.reverse);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  playRef.current = playRef.current
    ? playRef.current
    : (isPlay: boolean) => setIsPlaying(isPlay);

  const style = {
    animation: `${duration}s ${easeType} ${delay}s ${iterationCount} ${direction} ${fillMode} ${getPlayState(
      isPaused,
    )} ${
      (isPlaying
        ? animationNameRef.current.forward
        : animationNameRef.current.reverse) || ''
    }`,
  };

  return {
    style,
    play: playRef.current,
    pause: setIsPaused,
    isPlaying,
  };
}

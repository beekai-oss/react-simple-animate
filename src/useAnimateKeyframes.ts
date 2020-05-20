import * as React from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './logic/createTag';
import { AnimateContext } from './animateGroup';
import deleteRules from './logic/deleteRules';
import { AnimateKeyframesProps, Style } from './types';
import getPlayState from './utils/getPauseState';

export default function useAnimateKeyframes(
  props: AnimateKeyframesProps,
): {
  style: Style;
  play: (boolean) => void;
  pause: (boolean) => void;
  isPlaying: boolean;
} {
  const {
    duration = 0.3,
    delay = 0,
    easeType = 'linear',
    direction = 'normal',
    fillMode = 'none',
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
      deleteRules(
        styleTagRef.current.forward.sheet,
        animationNameRef.current.forward,
      );
      deleteRules(
        styleTagRef.current.reverse.sheet,
        animationNameRef.current.reverse,
      );
    };
  }, []);

  playRef.current = playRef.current
    ? playRef.current
    : (isPlay: boolean) => setIsPlaying(isPlay);

  const style = {
    animation: `${duration}s ${easeType} ${delay}s ${iterationCount} ${direction} ${fillMode} ${getPlayState(
      isPaused,
    )} ${(isPlaying
      ? animationNameRef.current.forward
      : animationNameRef.current.reverse) || ''}`,
  };

  return {
    style,
    play: playRef.current,
    pause: setIsPaused,
    isPlaying,
  };
}

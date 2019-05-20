import { useState, useEffect, useRef, useContext } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './logic/createTag';
import { AnimateContext } from './animateGroup';
import deleteRules from './logic/deleteRules';
import { AnimateKeyframesProps } from './types';
import getPlayState from './utils/getPauseState';

export default function useAnimateKeyframes(props: AnimateKeyframesProps) {
  const {
    duration = 0.3,
    delay = 0,
    easeType = 'linear',
    direction = 'normal',
    fillMode = 'none',
    iterationCount = 1,
    keyframes,
  } = props;
  const animationNameRef = useRef({
    forward: '',
    reverse: '',
  });
  const styleTagRef = useRef({
    forward: { sheet: {} },
    reverse: { sheet: {} },
  });
  const { register } = useContext(AnimateContext);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

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

    return () => {
      deleteRules(styleTagRef.current.forward.sheet, animationNameRef.current.forward);
      deleteRules(styleTagRef.current.reverse.sheet, animationNameRef.current.reverse);
    }
  }, []);

  const play = (isPlay: boolean) => {
    setIsPlaying(isPlay);
  };

  const pause = (isPaused: boolean) => {
    setIsPaused(isPaused);
  };

  const style = {
    animation: `${duration}s ${easeType} ${delay}s ${iterationCount} ${direction} ${fillMode} ${getPlayState(
      isPaused,
    )} ${(isPlaying ? animationNameRef.current.forward : animationNameRef.current.reverse) || ''}`,
  };

  return {
    style,
    play,
    pause,
    isPlaying,
  };
}

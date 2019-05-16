import { useState, useEffect, useRef, useContext } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './logic/createTag';
import { AnimateContext } from './animateGroup';
import deleteRules from './logic/deleteRules';
import { AnimateKeyframesProps } from './types';
import getPlayState from './utils/getPlayState';

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
  const animationNameRef = useRef('');
  const styleTagRef = useRef('');
  const { register } = useContext(AnimateContext);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    animationNameRef.current = createRandomName();
    const { styleTag } = createTag({
      animationName: animationNameRef.current,
      keyframes,
    });
    styleTagRef.current = styleTag;
    register(props);

    // @ts-ignore
    return () => deleteRules(styleTagRef.current.sheet, animationNameRef.current);
  }, []);

  const play = (isPlay: boolean) => {
    setIsPlaying(isPlay);
  };

  const style = {
    animation: `${duration}s ${easeType} ${delay}s ${iterationCount} ${direction} ${fillMode} ${getPlayState(
      isPlaying,
    )} ${animationNameRef.current || ''}`,
  };

  return {
    style,
    play,
    isPlaying,
  };
}

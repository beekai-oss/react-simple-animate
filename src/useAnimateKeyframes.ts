import { useState, useEffect, useRef, useContext } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './logic/createTag';
import { AnimateContext } from './animateGroup';
import deleteRules from './logic/deleteRules';
import { AnimateKeyframesProps } from './types';

export default function useAnimateKeyframes(props: AnimateKeyframesProps) {
  const {
    duration = 0.3,
    delay = 0,
    easeType = 'linear',
    direction = 'normal',
    fillMode = 'none',
    iterationCount = 1,
    playState = 'running',
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

  const style = isPlaying
    ? {
        animation: `${duration}s ${easeType} ${delay}s ${iterationCount} ${direction} ${fillMode} ${playState} ${animationNameRef.current ||
          ''}`,
      }
    : null;

  return {
    style,
    play,
    isPlaying,
  };
}

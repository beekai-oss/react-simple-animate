// @flow
import { useState, useEffect, useRef } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './style/createTag';
import type { AnimateKeyframesProps } from './animateKeyframes';
import deleteRules from './style/deleteRules';

type UseAnimateKeyframesProps = AnimateKeyframesProps & {
  animationName: string,
};

export default function useAnimateKeyframes(props: UseAnimateKeyframesProps) {
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
  const styleTagRef = useRef(null);
  const [{ play }, setPlay] = useState(props);
  const playFunction = (playValue: boolean) => {
    setPlay({
      ...props,
      play: playValue,
    });
  };

  useEffect(
    () => {
      if (!animationNameRef.current) {
        const name = createRandomName();
        const { styleTag } = createTag({ animationName: name, keyframes });
        styleTagRef.current = styleTag;
        animationNameRef.current = name;
      }

      return () => {
        if (styleTagRef.current && animationNameRef.current) {
          // $FlowIgnoreLine
          deleteRules(styleTagRef.current.sheet, animationNameRef.current);
        }
      };
    },
    [],
  );

  const style = play
    ? {
        animation: `${duration}s ${easeType} ${delay}s ${iterationCount} ${direction} ${fillMode} ${playState} ${animationNameRef.current ||
          ''}`,
      }
    : null;

  return [
    {
      style,
      play,
    },
    (playValue: boolean) => playFunction(playValue),
  ];
}

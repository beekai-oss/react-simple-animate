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
    durationSeconds = 0.3,
    delaySeconds = 0,
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
    [play],
  );

  const style = play
    ? {
        animation: `${durationSeconds}s ${easeType} ${delaySeconds}s ${iterationCount} ${direction} ${fillMode} ${playState} ${animationNameRef.current ||
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

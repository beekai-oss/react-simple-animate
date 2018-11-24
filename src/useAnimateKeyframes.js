// @flow
// $FlowIgnoreLine
import { useState, useEffect } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './style/createTag';
// import type { AnimationType } from './animate';
// import type { AnimateKeyframes } from './animateKeyframes';

// AnimationType | AnimateKeyframes

export default function useAnimateKeyframes(props: any) {
  const {
    durationSeconds = 0.3,
    delaySeconds = 0,
    easeType = 'linear',
    direction = 'normal',
    fillMode = 'none',
    iterationCount = 1,
    playState = 'running',
    keyframes,
    animationName,
  } = props;

  const [animateProps, setPlay] = useState(props);

  const playHook = (playValue: boolean) => {
    setPlay({
      ...props,
      play: playValue,
    });
  };

  useEffect(() => {
    const name = createRandomName();
    const { styleTag, index } = createTag({ animationName, keyframes });
    const localStyleTag = styleTag;
    const localIndex = index;

    setPlay({
      ...props,
      animationName: name,
    });

    return () => {
      localStyleTag.sheet.deleteRule(localIndex);
    };
  }, []);

  const style = animateProps.play
    ? {
        animation: `${durationSeconds}s ${easeType} ${delaySeconds}s ${iterationCount} ${direction} ${fillMode} ${playState} ${
          animateProps.animationName
        }`,
      }
    : null;

  return [
    {
      style,
      play: animateProps.play,
    },
    playHook,
  ];
}

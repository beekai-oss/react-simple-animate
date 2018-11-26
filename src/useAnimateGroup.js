// @flow
// $FlowIgnoreLine
import { useEffect, useState } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './style/createTag';
import attributesGenerator from './utils/attributesGenerator';

let localAnimationNames = [];

export default function useAnimateGroup(props: any) {
  const localStyleTags = [];
  const localIndexes = [];
  let nextDelaySeconds = 0;

  const [animateProps, setPlay] = useState(props);

  const playHook = (playValue: boolean) => {
    setPlay({
      ...props,
      play: playValue,
    });
  };

  const { play } = animateProps;

  useEffect(() => {
    props.forEach(({ keyframes = false }, i) => {
      if (keyframes) {
        const animationName = createRandomName();
        localAnimationNames[i] = animationName;
        const { styleTag, index } = createTag({ animationName, keyframes });
        localStyleTags.push(styleTag);
        localIndexes.push(index);
      }
    });

    return () => {
      localStyleTags.forEach((localStyleTag, i) => {
        // $FlowIgnoreLine
        localStyleTag.sheet.deleteRule(localIndexes[i]);
      });

      localAnimationNames = [];
    };
  }, []);

  const styles = props.map((prop, i) => {
    const {
      durationSeconds = 0.3,
      keyframes = false,
      easeType = 'linear',
      delaySeconds = 0,
      iterationCount = 1,
      direction = 'normal',
      fillMode = 'none',
      playState: stylePlayState = 'running',
      overlaySeconds = 0,
    } = prop;

    nextDelaySeconds = durationSeconds + delaySeconds - overlaySeconds;

    if (keyframes) {
      return play
        ? {
            animation: `${durationSeconds}s ${easeType} ${
              i === 0 ? delaySeconds : nextDelaySeconds + delaySeconds
            }s ${iterationCount} ${direction} ${fillMode} ${stylePlayState} ${localAnimationNames[i]}`,
          }
        : null;
    }

    return attributesGenerator(
      { ...{ ...prop, delaySeconds: i === 0 ? delaySeconds : nextDelaySeconds + delaySeconds }, play },
      false,
      false,
    ).style;
  });

  return [
    {
      styles,
      animationNames: localAnimationNames,
      play,
    },
    playHook,
  ];
}

// @flow
import { useEffect, useState } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './style/createTag';
import attributesGenerator from './utils/attributesGenerator';

export default function useAnimateGroup(props) {
  const animationNames = [];
  const localStyleTags = [];
  const localIndexes = [];
  let nextDelaySeconds = 0;

  const [animateProps, setPlay] = useState(props);

  const playHook = playValue => {
    setPlay({
      ...props,
      play: playValue,
    });
  };

  const { play } = animateProps;

  useEffect(() => {
    props.forEach(({ keyframes = false }) => {
      if (keyframes) {
        const animationName = createRandomName();
        animationNames.push(animationName);
        const { styleTag, index } = createTag({ animationName, keyframes });
        localStyleTags.push(styleTag);
        localIndexes.push(index);
      }
    });

    return () => {
      localStyleTags.forEach((localStyleTag, i) => {
        localStyleTag.sheet.deleteRule(localIndexes[i]);
      });
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

    if (typeof keyframes === 'string') {
      return play
        ? {
            animation: `${durationSeconds}s ${easeType} ${
              i === 0 ? delaySeconds : nextDelaySeconds + delaySeconds
            }s ${iterationCount} ${direction} ${fillMode} ${stylePlayState} ${animationNames[i]}`,
          }
        : null;
    }
    console.log(play);

    return attributesGenerator(
      { ...{ ...prop, delaySeconds: i === 0 ? delaySeconds : nextDelaySeconds + delaySeconds }, play },
      { willComplete: false },
      false,
    ).style;
  });

  return [
    {
      styles,
      play,
    },
    playHook,
  ];
}

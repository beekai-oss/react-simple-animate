// @flow
// $FlowIgnoreLine
import { useEffect, useState } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './style/createTag';
import attributesGenerator from './utils/attributesGenerator';
import type { Keyframes } from './animateKeyframes';
import type { Style } from './animate';
import deleteRules from './style/deleteRules';

export default function useAnimateGroup(props: {
  animateProps: Array<{
    keyframes?: Keyframes,
    durationSeconds?: number,
    easeType?: string,
    delaySeconds?: number,
    iterationCount?: string,
    direction?: string,
    fillMode?: string,
    playState?: string,
    overlaySeconds?: number,
    endStyle?: Style,
  }>,
  play: boolean,
  animationNames: string,
}) {
  let nextDelaySeconds = 0;
  const [value, setPlay] = useState(props);
  const playFunction = (playValue: boolean) => {
    setPlay({ animateProps: props.animateProps, play: playValue, animationNames: props.animationNames });
  };

  useEffect(() => {
    let localStyleTag;
    let localAnimationNames = [];

    value.animateProps.forEach(({ keyframes = false }, i) => {
      if (keyframes) {
        const animationName = createRandomName();
        localAnimationNames[i] = animationName;
        const { styleTag } = createTag({ animationName, keyframes });
        localStyleTag = styleTag;
      }
    });

    setPlay({
      animateProps: value.animateProps,
      play: value.play,
      animationNames: localAnimationNames,
    });

    return () => {
      if (localStyleTag) {
        localAnimationNames.forEach(name => {
          // $FlowIgnoreLine
          deleteRules(localStyleTag.sheet, name);
        });
      }

      localAnimationNames = [];
    };
  }, []);

  const styles: Array<?{
    [string]: string,
  }> = value.animateProps.map((prop, i) => {
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
      return value.play
        ? {
            animation: `${durationSeconds}s ${easeType} ${
              i === 0 ? delaySeconds : nextDelaySeconds + delaySeconds
            }s ${iterationCount} ${direction} ${fillMode} ${stylePlayState} ${value.animationNames[i]}`,
          }
        : null;
    }

    return attributesGenerator({
      ...{ ...prop, delaySeconds: i === 0 ? delaySeconds : nextDelaySeconds + delaySeconds },
      play: value.play,
    }).style;
  });

  return [
    {
      styles,
      animationNames: value.animationNames,
      play: value.play,
    },
    playFunction,
  ];
}

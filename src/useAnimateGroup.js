// @flow
// $FlowIgnoreLine
import { useEffect, useState } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './style/createTag';
import attributesGenerator from './utils/attributesGenerator';
import type { Keyframes } from './animateKeyframes';
import type { Style } from './animate';
import deleteRules from './style/deleteRules';

type Sequences = Array<{
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
}>;

export default function useAnimateGroup(props: {
  sequences: Sequences,
  reverseSequences?: Sequences,
  play: boolean,
  animationNames: string,
}) {
  let nextDelaySeconds = 0;
  const [{ sequences, reverseSequences, play, animationNames }, setPlay] = useState(props);
  const playFunction = (playValue: boolean) => {
    setPlay({ sequences, reverseSequences, play: playValue, animationNames });
  };

  useEffect(() => {
    let localStyleTag;
    let localAnimationNames = [];

    sequences.forEach(({ keyframes = false }, i) => {
      if (keyframes) {
        const animationName = createRandomName();
        localAnimationNames[i] = animationName;
        const { styleTag } = createTag({ animationName, keyframes });
        localStyleTag = styleTag;
      }
    });

    setPlay({
      sequences,
      play,
      reverseSequences,
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

  const localSequences = (play ? sequences : reverseSequences) || [];

  const styles: Array<?{
    [string]: string,
  }> = (reverseSequences ? localSequences : sequences).map((prop, i) => {
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
    nextDelaySeconds = nextDelaySeconds < 0 ? 0 : nextDelaySeconds;

    if (keyframes) {
      return play
        ? {
            styles: `${durationSeconds}s ${easeType} ${
              i === 0 ? delaySeconds : nextDelaySeconds + delaySeconds
            }s ${iterationCount} ${direction} ${fillMode} ${stylePlayState} ${animationNames[i]}`,
          }
        : null;
    }

    return attributesGenerator({
      ...{ ...prop, delaySeconds: i === 0 ? delaySeconds : nextDelaySeconds + delaySeconds },
      play,
    }).style;
  });

  return [
    {
      styles,
      animationNames,
      play,
    },
    playFunction,
  ];
}

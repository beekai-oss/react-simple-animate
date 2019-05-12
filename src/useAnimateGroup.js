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
  duration?: number,
  easeType?: string,
  delay?: number,
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
  let nextdelay = 0;
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
      duration = 0.3,
      keyframes = false,
      easeType = 'linear',
      delay = 0,
      iterationCount = 1,
      direction = 'normal',
      fillMode = 'none',
      playState: stylePlayState = 'running',
      overlaySeconds = 0,
    } = prop;

    nextdelay = duration + delay - overlaySeconds;
    nextdelay = nextdelay < 0 ? 0 : nextdelay;

    if (keyframes) {
      return play
        ? {
            style: `${duration}s ${easeType} ${
              i === 0 ? delay : nextdelay + delay
            }s ${iterationCount} ${direction} ${fillMode} ${stylePlayState} ${animationNames[i]}`,
          }
        : null;
    }

    return attributesGenerator({
      ...{ ...prop, delay: i === 0 ? delay : nextdelay + delay },
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

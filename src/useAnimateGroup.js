// @flow
// $FlowIgnoreLine
import { useEffect, useState } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './logic/createTag';
import type { Sequences } from './animateGroup';
import deleteRules from './logic/deleteRules';

export default function useAnimateGroup(props: { sequences: Sequences, play: boolean }) {
  let nextdelay = 0;
  const [{ sequences, play }, setPlay] = useState(props);
  const playFunction = (playValue: boolean) => {
    setPlay({ sequences, play: playValue });
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
  }> = sequences.map((prop, i) => {
    const {
      duration = 0.3,
      keyframes = false,
      easeType = 'linear',
      delay = 0,
      iterationCount = 1,
      direction = 'normal',
      fillMode = 'none',
      playState: stylePlayState = 'running',
      overlay = 0,
    } = prop;

    nextdelay = duration + delay - overlay;
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

    // return attributesGenerator({
    //   ...{ ...prop, delay: i === 0 ? delay : nextdelay + delay },
    //   play,
    // }).style;
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

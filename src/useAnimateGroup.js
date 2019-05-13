// @flow
// $FlowIgnoreLine
import { useEffect, useState } from 'react';
import createRandomName from './utils/createRandomName';
import calculateTotalDuration from './utils/calculateTotalDuration';
import createTag from './logic/createTag';
import deleteRules from './logic/deleteRules';
import type { Sequences } from './types';

export default function useAnimateGroup(props: { sequences: Sequences }) {
  let nextDelay = 0;
  const localAnimationNames = [];
  const { sequences } = props;
  const [isPlaying, setPlay] = useState(props);

  useEffect(() => {
    let localStyleTag;

    sequences.forEach(({ keyframes = false }, i) => {
      if (keyframes) {
        const animationName = createRandomName();
        localAnimationNames[i] = animationName;
        const { styleTag } = createTag({ animationName, keyframes });
        localStyleTag = styleTag;
      }
    });

    return () => {
      if (localStyleTag) {
        localAnimationNames.forEach(name => {
          // $FlowIgnoreLine
          deleteRules(localStyleTag.sheet, name);
        });
      }
    };
  }, []);

  const styles: Array<?{
    [string]: string,
  }> = sequences.map((prop, i) => {
    if (!isPlaying) return null;

    const {
      duration = 0.3,
      keyframes = false,
      easeType = 'linear',
      delay = 0,
      iterationCount = 1,
      direction = 'normal',
      fillMode = 'none',
      playState: stylePlayState = 'running',
      end,
    } = prop;

    nextDelay = calculateTotalDuration(props);

    if (keyframes) {
      return {
        style: `${duration}s ${easeType} ${
          i === 0 ? delay : nextDelay + delay
        }s ${iterationCount} ${direction} ${fillMode} ${stylePlayState} ${localAnimationNames[i]}`,
      };
    }

    return {
      ...end,
      transition: `all ${duration}s ${easeType} ${delay}s`,
    };
  });

  const play = (playValue: boolean) => {
    setPlay(playValue);
  };

  return [styles, play, isPlaying];
}

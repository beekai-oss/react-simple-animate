import { useEffect, useState } from 'react';
import createRandomName from './utils/createRandomName';
import calculateTotalDuration from './utils/calculateTotalDuration';
import createTag from './logic/createTag';
import deleteRules from './logic/deleteRules';
import { Sequences, Sequence } from './types';

export default function useAnimateGroup(props: { sequences: Sequences }) {
  let nextDelay = 0;
  const localAnimationNames = {};
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

    return (): void => {
      if (localStyleTag) {
        Object.values(localAnimationNames).forEach(name => {
          // @ts-ignore
          deleteRules(localStyleTag.sheet, name);
        });
      }
    };
  }, []);

  const styles = sequences.map((prop: Sequence, i) => {
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
      overlay,
    } = prop;

    nextDelay = calculateTotalDuration({
      duration,
      delay,
      overlay,
    });

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

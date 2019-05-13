import { useEffect, useState } from 'react';
import createRandomName from './utils/createRandomName';
import calculateTotalDuration from './utils/calculateTotalDuration';
import createTag from './logic/createTag';
import deleteRules from './logic/deleteRules';
import { AnimationStateType, Style } from './types';
import { Keyframes } from './animateKeyframes';

interface Props {
  easeType: string;
  delay: number;
  end: Style;
  duration: number;
  overlay: number;
  keyframes: Keyframes;
  playState?: string;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: string | number;
  animationStates: AnimationStateType;
}

export default function useAnimateGroup(props: { sequences: Props[] }) {
  let nextDelay = 0;
  const localAnimationNames = {};
  const { sequences } = props;
  const [isPlaying, setPlay] = useState(false);

  useEffect(() => {
    let localStyleTag;

    sequences.forEach(({ keyframes = false }, i) => {
      if (keyframes) {
        const animationName = createRandomName();
        localAnimationNames[i] = animationName;
        // @ts-ignore
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

  const styles = sequences.map(
    (
      prop,
      i,
    ) => {
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
    },
  );

  const play = (playValue: boolean) => {
    setPlay(playValue);
  };

  return [styles, play, isPlaying];
}

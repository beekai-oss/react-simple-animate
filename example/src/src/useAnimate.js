// @flow
import { useState, useEffect } from 'react';
import attributesGenerator from './utils/attributesGenerator';

export default function useAnimate(
  props = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
    sequenceId: undefined,
    sequenceIndex: undefined,
  },
) {
  let completeTimeout;
  const { onComplete, onCompleteStyle, delaySeconds = 0, durationSeconds = 0.3 } = props;
  const [animateProps, setPlay] = useState(props);
  const playHook = (play: boolean) => {
    setPlay({
      ...props,
      play,
    });
  };
  const { play, willComplete } = animateProps;

  useEffect(
    () => {
      if ((onComplete || onCompleteStyle) && play) {
        clearTimeout(completeTimeout);
        completeTimeout = setTimeout(() => {
          setPlay({
            ...animateProps,
            willComplete: true,
          });
          onComplete && onComplete();
        }, (parseFloat(delaySeconds) + parseFloat(durationSeconds)) * 1000);
      }

      return () => clearTimeout(completeTimeout);
    },
    [play],
  );

  return [
    {
      style: attributesGenerator({ ...props, play }, { willComplete }).style,
      play,
    },
    playHook,
  ];
}

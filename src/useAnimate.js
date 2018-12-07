// @flow
// $FlowIgnoreLine
import { useState, useEffect } from 'react';
import attributesGenerator from './utils/attributesGenerator';
import type { Props } from './animate';

type UseAnimate = Props & {
  willComplete?: boolean,
}

export default function useAnimate(
  props: UseAnimate = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
    play: false,
    endStyle: {},
  },
) {
  let completeTimeout;
  const { onComplete, onCompleteStyle, delaySeconds, durationSeconds } = props;
  const [animateProps, setPlay] = useState(props);
  const playFunction = (play: boolean) => {
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
      style: attributesGenerator({ ...props, play }, willComplete).style,
      play,
    },
    playFunction,
  ];
}

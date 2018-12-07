// @flow
// $FlowIgnoreLine
import { useState, useEffect } from 'react';
import attributesGenerator from './utils/attributesGenerator';
import type { Props } from './animate';
import msToMin from './utils/msToMin';

type UseAnimate = Props & {
  willComplete?: boolean,
};

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
  let initialPlayTimer;
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
        }, msToMin(parseFloat(delaySeconds) + parseFloat(durationSeconds)));
      }

      if (play) {
        initialPlayTimer = setTimeout(() => {
          playFunction(play);
        }, msToMin(delaySeconds));
      }

      return () => {
        clearTimeout(completeTimeout);
        clearTimeout(initialPlayTimer);
      };
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

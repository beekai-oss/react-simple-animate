// @flow
// $FlowIgnoreLine
import { useState, useEffect } from 'react';
import attributesGenerator from './utils/attributesGenerator';
import type { Props } from './animate';
import msToSec from './utils/msToSec';

type UseAnimate = Props & {
  willComplete?: boolean,
  isMountWithPlay?: boolean,
};

export default function useAnimate(
  props: UseAnimate = {
    duration: 0.3,
    delay: 0,
    easeType: 'linear',
    play: false,
    endStyle: {},
  },
) {
  let completeTimeout;
  let initialPlayTimer;
  const { onComplete, onCompleteStyle, delay = 0, duration = 0.3 } = props;
  const [animateProps, setPlay] = useState(props);
  const { play, willComplete, isMountWithPlay } = animateProps;
  const playFunction = (playValue: boolean, isMountWithPlayValue: mixed = animateProps.isMountWithPlay) => {
    setPlay({
      ...props,
      play: playValue,
      isMountWithPlay: isMountWithPlayValue,
    });
  };

  useEffect(
    () => {
      if ((onComplete || onCompleteStyle) && play) {
        clearTimeout(completeTimeout);
        completeTimeout = setTimeout(() => {
          setPlay({
            ...animateProps,
            willComplete: true,
            isMountWithPlay: false,
          });
          onComplete && onComplete();
        }, msToSec(parseFloat(delay) + parseFloat(duration)));
      }

      if (play && props.play && isMountWithPlay === undefined) {
        initialPlayTimer = setTimeout(() => {
          playFunction(play, false);
        }, msToSec(delay));
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
      style: attributesGenerator(
        { ...props, play },
        willComplete,
        isMountWithPlay === undefined ? props.play : isMountWithPlay,
      ).style,
      play,
    },
    playFunction,
  ];
}

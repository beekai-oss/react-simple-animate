// @flow
import React, { useEffect, useState, useRef } from 'react';
import attributesGenerator from './utils/attributesGenerator';
import msToSec from './utils/msToSec';

export type Style = { [string]: string | number };

export type AnimationType = {
  play?: boolean,
  start?: Style,
  end: Style,
  onCompleteStyle?: Style,
  overlaySeconds?: number,
  durationSeconds?: number,
  reverseDelaySeconds?: number,
  reverseDurationSeconds?: number,
  delaySeconds?: number,
  children?: any,
  forwardedRef?: any,
};

export type AnimationStateType = { [string | number]: AnimationType };

export type Props = {
  easeType?: string,
  tag?: string,
  onComplete: any,
  className?: string,
  render?: any,
  sequenceId?: string,
  sequenceIndex?: number,
  register?: any => void,
  animationStates?: AnimationStateType,
} & AnimationType;

export type State = {
  willComplete: boolean,
  play: boolean,
};

export default function Animate(
  props: Props = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
    sequenceId: undefined,
    sequenceIndex: undefined,
    animationStates: undefined,
    start: {},
    end: {},
    play: undefined,
    onComplete: () => {},
  },
) {
  const {
    play,
    children,
    render,
    start,
    end,
    onCompleteStyle,
    onComplete,
    delaySeconds,
    durationSeconds,
    sequenceId,
    sequenceIndex,
    animationStates,
  } = props;
  const onCompleteTimeRef = useRef(null);
  const [style, setStyle] = useState(start);

  // useEffect(() => {
  //   const id = sequenceId || sequenceIndex;
  //   if (animationStates[id])
  // }, [animationStates]);

  useEffect(
    () => {
      setStyle(play ? end : start);

      if (play && (onCompleteStyle || onComplete)) {
        onCompleteTimeRef.current = setTimeout(() => {
          onCompleteStyle && setStyle(onCompleteStyle);
          onComplete();
        }, msToSec(parseFloat(delaySeconds) + parseFloat(durationSeconds)));
      }

      return () => onCompleteTimeRef.current && clearTimeout(onCompleteTimeRef.current);
    },
    [play],
  );

  const componentStyle = attributesGenerator(props);

  return render ? render(style) : <div style={componentStyle}>{children}</div>;
}

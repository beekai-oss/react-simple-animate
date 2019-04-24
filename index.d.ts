import * as React from 'react';
import * as CSS from 'csstype';

export interface CSSProperties extends CSS.Properties<string | number> {}

interface IKeyFrame {
  [keyFramePercentage: number]: string;
}

export enum EASE_TYPES {
  easeInSine = 'easeInSine',
  easeOutSine = 'easeOutSine',
  easeInOutSine = 'easeInOutSine',
  easeInQuad = 'easeInQuad',
  easeOutQuad = 'easeOutQuad',
  easeInOutQuad = 'easeInOutQuad',
  easeInCubic = 'easeInCubic',
  easeOutCubic = 'easeOutCubic',
  easeInOutCubic = 'easeInOutCubic',
  easeInQuart = 'easeInQuart',
  easeOutQuart = 'easeOutQuart',
  easeInOutQuart = 'easeInOutQuart',
  easeInQuint = 'easeInQuint',
  easeOutQuint = 'easeOutQuint',
  easeInOutQuint = 'easeInOutQuint',
  easeInExpo = 'easeInExpo',
  easeOutExpo = 'easeOutExpo',
  easeInOutExpo = 'easeInOutExpo',
  easeInCirc = 'easeInCirc',
  easeOutCirc = 'easeOutCirc',
  easeInOutCirc = 'easeInOutCirc',
  easeInBack = 'easeInBack',
  easeOutBack = 'easeOutBack',
  easeInOutBack = 'easeInOutBack',
  easeInElastic = 'easeInElastic',
  easeOutElastic = 'easeOutElastic',
  easeInOutElastic = 'easeInOutElastic',
  easeInBounce = 'easeInBounce',
  easeOutBounce = 'easeOutBounce',
  easeInOutBounce = 'easeInOutBounce',
}

export enum ANIMATION_DIRECTIONS {
  NORMAL = 'normal',
  REVERSE = 'reverse',
  ALTERNATE = 'alternate',
  ALTERNATE_REVERSE = 'alternate-reverse',
}

export interface IBaseAnimateProps {
  play: boolean;
  startStyle?: CSSProperties;
  endStyle: CSSProperties;
  onCompleteStyle?: CSSProperties;
  overlaySeconds?: number;
  durationSeconds?: number;
  reverseDelaySeconds?: number;
  reverseDurationSeconds?: number;
  delaySeconds?: number;
  children?: React.ReactElement;
  forwardedRef?: any;
}

export interface AnimationStateType {
  [key: number]: IBaseAnimateProps;
}

export interface IAnimateProps extends IBaseAnimateProps {
  easeType?: EASE_TYPES | string;
  tag?: string;
  onComplete?: () => void;
  className?: string;
  render?: (props: any) => React.ReactElement;
  sequenceId?: string;
  sequenceIndex?: number;
  register?: (props: IAnimateProps) => void;
  animationStates?: AnimationStateType;
}

export interface ISequence extends IBaseAnimateProps {
  sequenceId?: string | number;
  sequenceIndex?: number;
}

export interface IAnimateGroupProps {
  play: boolean;
  sequences?: ISequence[];
  reverseSequences?: ISequence[];
  children: React.ReactElement;
}

export type Keyframes = Object[];

export interface IAnimateKeyframesProps {
  keyframes: IKeyFrame[];
  easeType?: string;
  durationSeconds?: number;
  render?: (styles: CSSProperties) => any;
  play: boolean;
  playState?: string;
  delaySeconds?: number;
  direction?: ANIMATION_DIRECTIONS;
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: string | number;
  animationStates: AnimationStateType;
  children?: React.ReactElement;
  register?: (props: IAnimateKeyframesProps) => void;
  sequenceId?: string;
  sequenceIndex?: number;
}

/**
 * Components
 */
export class Animate extends React.Component<IAnimateProps> {}
export class AnimateGroup extends React.Component<IAnimateGroupProps> {}
export class AnimateKeyframes extends React.Component<IAnimateKeyframesProps> {}

/**
 * Hooks
 */
export function useAnimate(
  animateProps: Partial<IAnimateProps>,
): [{ style: CSSProperties; play: boolean }, (play: boolean) => void];
export function useAnimateKeyframes(
  animateProps: Partial<IAnimateKeyframesProps>,
): [{ style: CSSProperties; play: boolean }, (play: boolean) => void];
export function useAnimateGroup(
  animateProps: Partial<IAnimateGroupProps>,
): [{ style: CSSProperties; play: boolean }, (play: boolean) => void];

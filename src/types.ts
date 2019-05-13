import { CSSProperties } from 'react';

export interface Style {
  [key: string]: string | number;
}

export interface AnimationType {
  play?: boolean;
  start?: CSSProperties;
  end: CSSProperties;
  complete?: CSSProperties;
  overlay?: number;
  duration?: number;
  delay?: number;
  easeType?: string;
  children?: any;
  register?: (data: any) => void;
  render?: (data: { style: CSSProperties | null }) => any;
  sequenceId?: string | number;
  sequenceIndex?: number;
}

export interface AnimationStateType {
  [key: string]: AnimationType;
}

export type Sequences = AnimationType[];

export type Keyframes = { [key: string]: string }[] | { [key: number]: string }[];

export interface AnimationProps extends AnimationType {
  complete?: CSSProperties;
  onComplete?: () => void;
  animationStates?: AnimationStateType;
}

export interface AnimateKeyframesProps extends AnimationType {
  keyframes: Keyframes;
  playState?: string;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: string | number;
  animationStates: AnimationStateType;
}

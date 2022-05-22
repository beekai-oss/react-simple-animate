import * as React from 'react';

export interface AnimationType {
  play?: boolean;
  overlay?: number;
  duration?: number;
  delay?: number;
  easeType?: string;
  children?: any;
  register?: (data: any) => void;
  render?: (data: { style: React.CSSProperties | null }) => any;
  sequenceId?: string | number;
  sequenceIndex?: number;
}

export interface AnimationStateType {
  [key: string]: AnimationType;
}

export type Sequences = AnimationType[];

export type HookSequences = {
  keyframes?: Keyframes;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: number;
  start?: React.CSSProperties;
  end?: React.CSSProperties;
  overlay?: number;
  duration?: number;
  delay?: number;
  easeType?: string;
}[];

export type Keyframes =
  | string[]
  | { [key: number]: string }[]
  | { [key: string]: string | number }[];

export interface AnimationProps extends AnimationType {
  onComplete?: () => void;
  start?: React.CSSProperties;
  end?: React.CSSProperties;
  complete?: React.CSSProperties;
  animationStates?: AnimationStateType;
}

export interface AnimateKeyframesProps extends AnimationType {
  keyframes: Keyframes;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: string | number;
  animationStates?: AnimationStateType;
  pause?: boolean;
}

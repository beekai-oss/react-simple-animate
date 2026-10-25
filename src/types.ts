import type * as React from 'react';

export interface AnimationType {
  play?: boolean;
  overlay?: number;
  duration?: number;
  delay?: number;
  easeType?: string;
  transitionProperty?: string;
  children?: React.ReactNode;
  register?: (data: AnimationType) => void;
  render?: (data: {
    style: React.CSSProperties | undefined;
    onTransitionStart?: React.TransitionEventHandler<HTMLElement>;
    onTransitionEnd?: React.TransitionEventHandler<HTMLElement>;
    onTransitionCancel?: React.TransitionEventHandler<HTMLElement>;
    onAnimationStart?: React.AnimationEventHandler<HTMLElement>;
    onAnimationEnd?: React.AnimationEventHandler<HTMLElement>;
    onAnimationCancel?: React.AnimationEventHandler<HTMLElement>;
  }) => React.ReactElement;
  sequenceId?: string | number;
  sequenceIndex?: number;
}

export interface AnimationStateType {
  [key: string]: AnimationType;
}

export type Sequences = AnimationType[];

export type HookSequences = {
  onStart?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
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
  transitionProperty?: string;
}[];

export type Keyframes =
  | string[]
  | { [key: number]: string }[]
  | { [key: string]: string | number }[];

export interface AnimationProps extends AnimationType {
  onStart?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
  cancel?: boolean;
  start?: React.CSSProperties;
  end?: React.CSSProperties;
  complete?: React.CSSProperties;
  animationStates?: AnimationStateType;
}

export interface AnimateKeyframesProps extends AnimationType {
  keyframes: Keyframes;
  onStart?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
  cancel?: boolean;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: string | number;
  animationStates?: AnimationStateType;
  pause?: boolean;
}

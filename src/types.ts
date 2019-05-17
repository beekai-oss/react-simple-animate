interface CSSProperties {
  [key: string]: number | string;
}

export interface Style {
  [key: string]: string | number;
}

export interface AnimationType {
  play?: boolean;
  overlay?: number;
  duration?: number;
  delay?: number;
  easeType?: string;
  children?: any;
  register?: (data: any) => void;
  render?: (data: { style: Style | null }) => any;
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
  iterationCount?: string | number;
  start?: Style;
  end?: Style;
  overlay?: number;
  duration?: number;
  delay?: number;
  easeType?: string;
}[];

export type Keyframes = string[] | { [key: number]: string }[];

export interface AnimationProps extends AnimationType {
  onComplete?: () => void;
  start?: Style;
  end: Style;
  complete?: Style;
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

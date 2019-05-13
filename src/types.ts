export interface Style {
  [key: string]: string | number;
}

export interface AnimationType {
  play?: boolean;
  start?: Style;
  end: Style;
  complete?: Style;
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

export type Keyframes = { [key: string]: string }[] | { [key: number]: string }[];

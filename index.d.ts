interface IStyles {
    [key: string]: any;
}

interface IKeyFrame {
    [keyFramePercentage: number]: string
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

export interface Animate {
    play?: boolean;
    startStyle: IStyles;
    endStyle: IStyles;
    onCompleteStyle: IStyles;
    durationSeconds?: number;
    delaySeconds: number;
    reverseDurationSeconds: number;
    reverseDelaySeconds: number;
    onComplete: () => void;
    render: (styles: IStyles) => any;
    easeType?: EASE_TYPES
    sequenceIndex: number;
    sequenceId: string | number;
    overlaySeconds: number;
}

export enum ANIMATION_DIRECTIONS {
    NORMAL = 'normal',
    REVERSE = 'reverse',
    ALTERNATE = 'alternate',
    ALTERNATE_REVERSE = 'alternate-reverse'
}

export interface AnimateGroup {
    play?: boolean
    sequences?: any
    reverseSequences: string[] | number[]
}
export interface AnimateKeyframes {
    play?: boolean;
    keyframes: string[] | IKeyFrame[];
    durationSeconds?: number;
    delaySeconds: number;
    iterationCount?: string | number;
    direction?: ANIMATION_DIRECTIONS;
    playState?: 'running' | 'paused';
    fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
    render: (styles: IStyles) => any;
    easeType?: EASE_TYPES;
    sequenceIndex: number,
    sequenceId: string | number;
    overlaySeconds: number;
}
export function useAnimate (animateProps : Partial<Animate>) : [
    {style: IStyles, play: boolean},
    (play : boolean) => void
]
export function useAnimateKeyframes (animateProps : Partial<AnimateGroup>) : [
    {style: IStyles, play: boolean},
    (play : boolean) => void
]
export function useAnimateGroup (animateProps : Partial<AnimateGroup>) : [
    {style: IStyles, play: boolean},
    (play : boolean) => void
]

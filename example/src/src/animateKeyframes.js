// @flow
import React from 'react';
import createTag from './style/createTag';
import createRandomName from './utils/createRandomName';
import { AnimateContext } from './animateGroup';
import deleteRule from './style/deleteRules';
import type { AnimationStateType } from './animate';

export type Keyframes = Array<Object>;

export type AnimateKeyframesProps = {
  keyframes: Keyframes,
  easeType?: string,
  durationSeconds?: number,
  render?: (?Object) => any,
  play: boolean,
  playState?: string,
  delaySeconds?: number,
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse',
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both',
  iterationCount?: string | number,
  animationStates: AnimationStateType,
  children?: any,
  register?: any => void,
  sequenceId?: string,
  sequenceIndex?: number,
};

type State = {
  play: boolean,
};

export class AnimateKeyframesChild extends React.PureComponent<AnimateKeyframesProps, State> {
  static displayName = 'AnimateKeyframes';

  static defaultProps = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
    render: undefined,
    playState: 'running',
    direction: 'normal',
    fillMode: 'none',
    iterationCount: 1,
    children: undefined,
    sequenceId: undefined,
    sequenceIndex: undefined,
    register: undefined,
  };

  state = {
    play: false,
  };

  componentDidMount() {
    const { register, play } = this.props;
    this.createStyleAndTag();
    register && register(this.props);

    if (play) {
      this.forceUpdate();
    }
  }

  static getDerivedStateFromProps(nextProps: AnimateKeyframesProps, prevState: State) {
    const { animationStates, play, sequenceId, sequenceIndex } = nextProps;
    const id = sequenceId || sequenceIndex;
    let currentPlay = play;

    if (id !== undefined && animationStates && animationStates[id]) {
      const state = animationStates[id];
      currentPlay = state.play;
    }

    return {
      ...(currentPlay !== prevState.play ? { play: currentPlay } : null),
    };
  }

  componentWillUnmount() {
    deleteRule(this.styleTag.sheet, this.animationName);
  }

  createStyleAndTag = () => {
    const { keyframes } = this.props;

    this.animationName = createRandomName();
    const { styleTag, index } = createTag({ animationName: this.animationName, keyframes });

    this.styleTag = styleTag;
    this.index = index;
  };

  animationName: string;

  index: number;

  styleTag: any;

  render() {
    const {
      children,
      play,
      render,
      durationSeconds = 0.3,
      delaySeconds = 0,
      easeType = 'linear',
      playState = 'running',
      direction = 'normal',
      fillMode = 'none',
      iterationCount = 1,
    } = this.props;
    const style =
      play || this.state.play
        ? {
          animation: `${durationSeconds}s ${easeType} ${delaySeconds}s ${iterationCount} ${direction} ${fillMode} ${playState} ${
            this.animationName
            }`,
        }
        : null;

    return render ? render(style) : <div {...(style ? { style } : null)}>{children}</div>;
  }
}

// $FlowIgnoreLine: flow complain about React.forwardRef disable for now
export default React.forwardRef((props: AnimateKeyframesProps, ref) => (
  <AnimateContext.Consumer>
    {({ animationStates = {}, register = undefined }) => (
      <AnimateKeyframesChild {...{ ...props, animationStates, register }} forwardedRef={ref} />
    )}
  </AnimateContext.Consumer>
));

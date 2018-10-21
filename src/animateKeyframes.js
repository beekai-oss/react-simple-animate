// @flow
import React from 'react';
import createTag from './style/createTag';
import { AnimateContext } from './animateGroup';

type Props = {
  keyframes: Array<string>,
  easeType?: string,
  durationSeconds?: number,
  render?: Object => any,
  play: boolean,
  playState?: boolean,
  delaySeconds?: number,
  direction?: string,
  iterations?: string | number,
  fillMode?: string,
  iterationCount?: number,
};

type State = {};

export class AnimateKeyframesChild extends React.PureComponent<Props, State> {
  static defaultProps = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
    render: undefined,
    iterations: 1,
    playState: 'running',
    direction: 'normal',
    fillMode: 'none',
    iterationCount: 1,
  };

  componentDidMount() {
    const { styleTag, index, animationName } = createTag(this.props.keyframes);

    this.styleTag = styleTag;
    this.animationName = animationName;
    this.index = index;
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { animationStates, play, sequenceId, sequenceIndex } = nextProps;
    const id = sequenceId || sequenceIndex;
    let currentPlay = play;

    if (id && animationStates && animationStates[id]) {
      const state = animationStates[id];
      currentPlay = state.play;
    }

    return {
      ...(currentPlay !== prevState.play ? { play: currentPlay } : null),
    };
  }

  componentWillUnmount() {
    this.styleTag.sheet.deleteRule(this.index);
  }

  animationName: string;

  index: number;

  styleTag: {};

  render() {
    const {
      children,
      play,
      render,
      playState,
      delaySeconds,
      direction,
      durationSeconds,
      easeType,
      iterations,
      fillMode,
    } = this.props;
    const style = play
      ? {
          animation: `${durationSeconds}s ${easeType} ${delaySeconds}s ${iterations} ${direction} ${fillMode} ${playState} ${
            this.animationName
          }`,
        }
      : null;

    return render ? render(style) : <div style={style}>{children}</div>;
  }
}

// $FlowIgnoreLine: flow complain about React.forwardRef disable for now
export default React.forwardRef((props: Props, ref) => (
  <AnimateContext.Consumer>
    {({ animationStates = {}, register = undefined }) => (
      <AnimateKeyframesChild {...{ ...props, animationStates, register }} forwardedRef={ref} />
    )}
  </AnimateContext.Consumer>
));

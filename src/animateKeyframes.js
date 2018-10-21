// @flow
import React from 'react';
import createStyle from './style/createStyle';
import createRandomName from './utils/createRandomName';
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

const styleTagName = 'style[data-id-rsi]';

export class AnimateKeyframes extends React.PureComponent<Props, State> {
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
    const { keyframes, durationSeconds, easeType } = this.props;

    this.animationName = createRandomName();
    this.styleTag = document.querySelector(styleTagName);
    if (!this.styleTag) {
      this.styleTag = document.createElement('style');
      this.styleTag.setAttribute('data-id', 'rsi');
      document.head.appendChild(this.styleTag);
    }
    this.index = this.styleTag.sheet.cssRules.length;

    this.styleTag.sheet.insertRule(
      createStyle({
        keyframes,
        durationSeconds,
        easeType,
        animationName: this.animationName,
      }),
      this.index,
    );
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
      <AnimateKeyframes {...{ ...props, animationStates, register }} forwardedRef={ref} />
    )}
  </AnimateContext.Consumer>
));

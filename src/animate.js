// @flow
import React from 'react';
import attributesGenerator from './utils/attributesGenerator';
import { AnimateContext } from './animateGroup';

export type Style = { [string]: string | number };

export type AnimationType = {
  play: boolean,
  startStyle?: Style,
  endStyle: Style,
  onCompleteStyle?: Style,
  overlaySeconds?: number,
  durationSeconds?: number,
  reverseDelaySeconds?: number,
  reverseDurationSeconds?: number,
  delaySeconds?: number,
  children?: React.Component<*>,
  forwardedRef: any,
};

export type AnimationStateType = { [string | number]: AnimationType };

export type Props = {
  easeType?: string,
  tag?: string,
  onComplete?: () => mixed,
  className?: string,
  render?: Object => any,
  unMount?: boolean,
  mount?: boolean,
  sequenceId?: string,
  sequenceIndex?: number,
  register?: any => void,
  forceUpdate?: boolean,
  animationStates: AnimationStateType | {},
} & AnimationType;

export type State = {
  willComplete: boolean,
  play: boolean,
  shouldUnMount: boolean,
  shouldMount: boolean,
};

export class AnimateChild extends React.PureComponent<Props, State> {
  static displayName = 'ReactSimpleAnimate';

  static defaultProps = {
    durationSeconds: 0.3,
    easeType: 'linear',
  };

  state: State = {
    willComplete: false,
    play: false,
    shouldUnMount: false,
    shouldMount: false,
  };

  componentDidMount() {
    const { register, mount } = this.props;
    register && register(this.props);

    if (mount && !this.state.shouldMount) {
      this.mountTimeout = setTimeout(() => this.setState({ shouldMount: true }));
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { animationStates, play, sequenceId, sequenceIndex, onCompleteStyle } = nextProps;
    const id = sequenceId || sequenceIndex;
    let currentplay = play;

    if (id && animationStates && animationStates[id]) {
      const state = animationStates[id];
      currentplay = state.play;
    }

    return {
      ...(onCompleteStyle && prevState.willComplete
        ? { willComplete: !(play && !prevState.play && prevState.willComplete) }
        : null),
      ...(currentplay !== prevState.play ? { play: currentplay } : null),
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { durationSeconds, unMount } = this.props;

    this.onComplete();

    if (!prevProps.unMount && unMount) {
      this.unMountTimeout = setTimeout(
        () => this.setState({ shouldUnMount: true }),
        parseFloat(durationSeconds) * 1000,
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this.completeTimeout);
    clearTimeout(this.unMountTimeout);
    clearTimeout(this.mountTimeout);
  }

  onComplete(): void {
    const {
      delaySeconds,
      play,
      onCompleteStyle,
      durationSeconds,
      onComplete,
      animationStates,
      sequenceId,
      sequenceIndex,
    } = this.props;
    const id = sequenceId || sequenceIndex;

    if (
      (onComplete || onCompleteStyle) &&
      !this.state.willComplete &&
      (play ||
        (id && Object.keys(animationStates).length && animationStates[id] && animationStates[id].play))
    ) {
      clearTimeout(this.completeTimeout);
      this.completeTimeout = setTimeout(() => {
        this.setState({
          willComplete: true,
        });
        onComplete && onComplete();
      }, (parseFloat(delaySeconds) + parseFloat(durationSeconds)) * 1000);
    }
  }

  completeTimeout: TimeoutID;
  unMountTimeout: TimeoutID;
  mountTimeout: TimeoutID;

  render() {
    const { tag = 'div', children, render } = this.props;
    const { shouldUnMount } = this.state;

    if (shouldUnMount) return null;

    const props = attributesGenerator(this.props, this.state);
    return render ? render(props) : React.createElement(tag, props, children);
  }
}

// $FlowIgnoreLine: flow complain about React.forwardRef disable for now
export default React.forwardRef((props: Props, ref) => (
  <AnimateContext.Consumer>
    {({ animationStates = {}, register = undefined }) => (
      <AnimateChild {...{ ...props, animationStates, register }} forwardedRef={ref} />
    )}
  </AnimateContext.Consumer>
));

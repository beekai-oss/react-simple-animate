// @flow
import React from 'react';
import propsGenerator from './utils/propsGenerator';
import { AnimateContext } from './animateGroup';

export type Style = { [string]: string | number };

export type AnimationType = {
  startAnimation: boolean,
  startStyle?: Style,
  endStyle: Style,
  onCompleteStyle?: Style,
  overlaySeconds?: number,
  durationSeconds?: number,
  reverseDelaySeconds?: number,
  reverseDurationSeconds?: number,
  delaySeconds?: number,
  children?: React.Component<*>,
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
  refCallback?: any => {},
  sequenceId?: string,
  sequenceIndex?: number,
  register?: any => void,
  forceUpdate?: boolean,
  animationStates: AnimationStateType | {},
} & AnimationType;

export type State = {
  willComplete: boolean,
  startAnimation: boolean,
  shouldUnMount: boolean,
  shouldMount: boolean,
};

export class AnimateChild extends React.PureComponent<Props, State> {
  static displayName = 'ReactSimpleAnimate';

  state: State = {
    willComplete: false,
    startAnimation: false,
    shouldUnMount: false,
    shouldMount: false,
  };

  componentDidMount() {
    const { register, mount } = this.props;
    register && register(this.props);

    if (mount && !this.state.shouldMount) {
      this.mountTimeout = setTimeout(() => this.setState({ shouldMount: true }), 100);
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { animationStates, startAnimation, sequenceId, sequenceIndex, onCompleteStyle } = nextProps;
    const id = sequenceId || sequenceIndex;
    let currentStartAnimation = startAnimation;

    if (id && animationStates && animationStates[id]) {
      const state = animationStates[id];
      currentStartAnimation = state.startAnimation;
    }

    return {
      ...(onCompleteStyle && prevState.willComplete
        ? { willComplete: !(startAnimation && !prevState.startAnimation && prevState.willComplete) }
        : null),
      ...(currentStartAnimation !== prevState.startAnimation ? { startAnimation: currentStartAnimation } : null),
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
      startAnimation,
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
      (startAnimation ||
        (id && Object.keys(animationStates).length && animationStates[id] && animationStates[id].startAnimation))
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

    const props = propsGenerator(this.props, this.state);
    return render ? render(props) : React.createElement(tag, props, children);
  }
}

export default (props: Props) => (
  <AnimateContext.Consumer>
    {({ animationStates = {}, register = undefined }) => <AnimateChild {...{ ...props, animationStates, register }} />}
  </AnimateContext.Consumer>
);

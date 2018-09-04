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
  refCallback?: (React.Component<*>) => {},
  sequenceId?: string,
  sequenceIndex?: number,
  register?: (any) => void,
  forceUpdate?: boolean,
  animationStates?: AnimationStateType,
} & AnimationType;

export type State = {
  willComplete: boolean,
  startAnimation: boolean,
  shouldUnMount: boolean,
};

export class Animate extends React.PureComponent<Props, State> {
  static displayName = 'ReactSimpleAnimate';

  static defaultProps = {
    startStyle: {},
    onCompleteStyle: undefined,
    durationSeconds: 0.3,
    delaySeconds: 0,
    reverseDurationSeconds: undefined,
    reverseDelaySeconds: 0,
    easeType: 'linear',
    tag: 'div',
    onComplete: undefined,
    className: undefined,
    innerRef: undefined,
    sequenceId: undefined,
    sequenceIndex: undefined,
  };

  state: State = {
    willComplete: false,
    startAnimation: false,
    shouldUnMount: false,
  };

  componentDidMount() {
    this.props.register && this.props.register(this.props);
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { animationStates, startAnimation, sequenceId, sequenceIndex } = nextProps;
    const id = sequenceId || sequenceIndex;
    let currentStartAnimation = startAnimation;

    if (id && animationStates && animationStates[id]) {
      const state = animationStates[id];
      currentStartAnimation = state.startAnimation;
    }

    return {
      willComplete: !(prevState.willComplete && startAnimation && !prevState.startAnimation),
      startAnimation: currentStartAnimation,
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { durationSeconds, register, unMount } = this.props;

    this.onComplete();
    register && register(this.props);

    if (!prevProps.unMount && unMount) {
      this.unMountTimeout = setTimeout(() => this.setState({ shouldUnMount: false }), durationSeconds);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.completeTimeout);
    clearTimeout(this.unMountTimeout);
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
      (startAnimation || (animationStates && id && animationStates[id].startAnimation))
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

  render() {
    const { tag = 'div', children, render } = this.props;
    const { shouldUnMount } = this.state;
    const props = propsGenerator(this.props, this.state);

    if (shouldUnMount) return null;

    return render ? render(props) : React.createElement(tag, props, children);
  }
}

export default (props: Props) => (
  <AnimateContext.Consumer>
    {({ animationStates = {}, register = undefined }) => <Animate {...{ ...props, animationStates, register }} />}
  </AnimateContext.Consumer>
);

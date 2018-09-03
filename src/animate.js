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

export type Props = {
  easeType?: string,
  tag?: string,
  onComplete?: () => mixed,
  className?: string,
  render: Object => any,
  unMount: boolean,
  refCallback?: (React.Component<*>) => {},
  sequenceId?: string,
  register?: Function,
  forceUpdate: boolean,
  animationStates: any,
} & AnimationType;

export type State = {
  willComplete: boolean,
  startAnimation: boolean,
  shouldUnMount: boolean,
};

export class Animate extends React.PureComponent<Props, State> {
  static disstartAnimationName = 'ReactSimpleAnimate';

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
    register: undefined,
    sequenceId: undefined,
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
    if (nextProps.animationStates[nextProps.sequenceId]) {
      const state = nextProps.animationStates[nextProps.sequenceId];
      return {
        willComplete: !((prevState.willComplete || state.willComplete) && state.startAnimation && !prevState.startAnimation),
        startAnimation: state.startAnimation,
      };
    }

    return {
      willComplete: !(prevState.willComplete && nextProps.startAnimation && !prevState.startAnimation),
      startAnimation: nextProps.startAnimation,
    };
  }

  componentDidUpdate(prevProps: Props) {
    this.onComplete();
    this.props.register && this.props.register(this.props);
    if (!prevProps.unMount && this.props.unMount) {
      setTimeout(() => this.setState({ shouldUnMount: false }), this.props.durationSeconds);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.completeTimeout);
  }

  onComplete(): void {
    const { delaySeconds, startAnimation, onCompleteStyle, durationSeconds, onComplete, animationStates, sequenceId } = this.props;

    if ((onComplete || onCompleteStyle) && !this.state.willComplete && (startAnimation || animationStates[sequenceId].startAnimation)) {
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

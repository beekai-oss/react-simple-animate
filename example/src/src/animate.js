// @flow
import React from 'react';
import propsGenerator from './utils/propsGenerator';
import { AnimateContext } from './animateContext';

export type Style = { [string]: string | number };

export type AnimationType = {
  play: boolean,
  startStyle?: Style,
  endStyle: Style,
  onCompleteStyle?: Style,
  durationSeconds?: number,
  delaySeconds?: number,
};

export type Props = {
  easing?: string,
  tag?: string,
  onComplete?: () => mixed,
  className?: string,
  render: Object => any,
  unMount: boolean,
  innerRef?: (React.Element<*>) => {},
  id?: string,
  forceUpdate: boolean,
  animationStates: any,
} & AnimationType;

export type State = {
  willComplete: boolean,
  play: boolean,
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
    easing: 'linear',
    tag: 'div',
    onComplete: undefined,
    className: undefined,
    innerRef: undefined,
    register: undefined,
    id: undefined,
  };

  state: State = {
    willComplete: false,
    play: false,
    shouldUnMount: false,
  };

  componentDidMount() {
    this.props.register && this.props.register(this.props);
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.animationStates[nextProps.id]) {
      const state = nextProps.animationStates[nextProps.id];
      return {
        willComplete: !((prevState.willComplete || state.willComplete) && state.play && !prevState.play),
        play: state.play,
      };
    }

    return {
      willComplete: !(prevState.willComplete && nextProps.play && !prevState.play),
      play: nextProps.play,
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
    const { delaySeconds, play, onCompleteStyle, durationSeconds, onComplete, animationStates, id } = this.props;

    if ((onComplete || onCompleteStyle) && !this.state.willComplete && (play || animationStates[id].play)) {
      clearTimeout(this.completeTimeout);
      this.completeTimeout = setTimeout(() => {
        this.setState({
          willComplete: true,
        });
        onComplete && onComplete();
      }, (parseFloat(delaySeconds) + parseFloat(durationSeconds)) * 1000);
    }
  }

  completeTimeout = null;

  render() {
    const { tag = 'div', children, render } = this.props;
    const { shouldUnMount } = this.state;
    const props = propsGenerator(this.props, this.state);

    if (shouldUnMount) return null;

    return render ? render(props) : React.createElement(tag, props, children);
  }
}

export default props => (
  <AnimateContext.Consumer>
    {({ animationStates = {}, register = undefined }) => <Animate {...{ ...props, animationStates, register }} />}
  </AnimateContext.Consumer>
);

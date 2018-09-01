// @flow
import React from 'react';
import propsGenerator from './utils/propsGenerator';
import { AnimateContext } from './animateContext';

export type Style = { [string]: string | number };

export type Props = {
  play: boolean,
  startStyle?: Style,
  endStyle: Style,
  onCompleteStyle?: Style,
  durationSeconds?: number,
  delaySeconds?: number,
  easing?: string,
  tag?: string,
  onComplete?: () => mixed,
  className?: string,
  render: Object => any,
  unMount: boolean,
  innerRef?: (React.Element<*>) => {},
  id?: string,
};

export type State = {
  willComplete: boolean,
  play: boolean,
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

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {
      willComplete: !(prevState.willComplete && nextProps.play && !prevState.play),
      play: nextProps.play,
    };
  }

  componentDidUpdate(prevProps: Props) {
    this.onComplete();
    if (!prevProps.unMount && this.props.unMount) {
      setTimeout(() => this.setState({ shouldUnMount: false }), this.props.durationSeconds);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.completeTimeout);
  }

  onComplete(): void {
    const { delaySeconds, play, onCompleteStyle, durationSeconds, onComplete } = this.props;

    if ((onComplete || onCompleteStyle) && !this.state.willComplete && play) {
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
    const componentProps = propsGenerator(this.props, this.state);

    if (shouldUnMount) return null;

    return render ? render(componentProps) : React.createElement(tag, componentProps, children);
  }
}

const AnimateWithContext = (props: any) => (
  <AnimateContext.Consumer>{({ register }) => <Animate {...{ ...props, register }} />};</AnimateContext.Consumer>
);

export default AnimateWithContext;

// @flow
import React from 'react';
import propsGenerator from './utils/propsGenerator';
import { AnimateContext } from './animateContext';

export type Style = { [string]: string | number };

type ChildrenType = Array<React.Element<*>> | React.Element<*> | null;

export type Props = {
  play: boolean,
  children?: ChildrenType,
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
  refCallback?: (React.Element<*>) => {},
};

export type State = {
  willComplete: boolean,
  play: boolean,
};

export default class Animate extends React.PureComponent<Props, State> {
  static displayName = 'ReactSimpleAnimate';

  static defaultProps = {
    startStyle: {},
    onCompleteStyle: undefined,
    durationSeconds: 0.3,
    delaySeconds: 0,
    reverseDurationSeconds: undefined,
    reverseDelaySeconds: 0,
    children: null,
    easing: 'linear',
    tag: 'div',
    onComplete: undefined,
    className: undefined,
    refCallback: undefined,
  };

  state: State = {
    willComplete: false,
    play: false,
    shouldRender: true,
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
      setTimeout(() => this.setState({ shouldRender: false }), this.props.durationSeconds);
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
    const { shouldRender } = this.state;
    const componentProps = propsGenerator(this.props, this.state);

    return !shouldRender ? null : (
      <AnimateContext.Consumer>
        {data => {
          console.log(data);
          return render ? render(componentProps) : React.createElement(tag, componentProps, children);
        }}
      </AnimateContext.Consumer>
    );
  }
}

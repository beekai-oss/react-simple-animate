// @flow
import React from 'react';
import propsGenerator from './utils/propsGenerator';
import { AnimateContext } from './animateContext';

export type Style = { [string]: string | number };

type ChildrenType = Array<React$Element<any>> | React$Element<any> | null;

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
  refCallback?: (React$Element<any>) => {},
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
    children: null,
    easing: 'linear',
    tag: 'div',
    onComplete: undefined,
    className: undefined,
    refCallback: undefined,
  };

  state: State = {
    willComplete: false,
    played: false,
    play: false,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {
      willComplete: !(prevState.willComplete && nextProps.play && !prevState.play),
      play: nextProps.play,
    };
  }

  componentDidUpdate(prevProps: Props) {
    this.onComplete(prevProps);
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
    const { tag, children, render } = this.props;

    const tagName = tag || 'div';
    const componentProps = propsGenerator(this.props, this.state);

    return (
      <AnimateContext.Consumer>
        {data => {
          console.log(data);
          return render ? render(componentProps) : React.createElement(tagName, componentProps, children);
        }}
      </AnimateContext.Consumer>
    );
  }
}

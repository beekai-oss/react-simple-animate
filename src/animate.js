// @flow
import React, { createElement } from 'react';

const defaultState = {
  animationWillEnd: false,
};

type Style = { [string]: string | number };

type Props = {
  startAnimation: boolean,
  children: mixed,
  startStyle?: Style,
  endStyle: Style,
  onCompleteStyle?: Style,
  durationSeconds: number,
  delaySeconds: number,
  easeType: string,
  forceUpdate?: boolean,
  tag?: ?string,
  onComplete?: () => mixed,
  className?: string,
  transition?: string,
};

type DefaultProps = {
  durationSeconds: number,
  delaySeconds: number,
  easeType: string,
  tag: string,
};

type State = {
  animationWillEnd: boolean,
};

export default class Animate extends React.Component<
  DefaultProps,
  Props,
  State,
> {
  static defaultProps = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
    tag: 'div',
  };

  state = defaultState;

  animationTimeout = null;

  animationCompleteTimeout = null;

  componentWillUnmount() {
    clearTimeout(this.animationTimeout);
    clearTimeout(this.animationCompleteTimeout);
    this.animationTimeout = null;
    this.animationCompleteTimeout = null;
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // only situation that should trigger a re-render
    return (
      JSON.stringify(nextProps.startStyle) !==
        JSON.stringify(this.props.startStyle) ||
      JSON.stringify(nextProps.endStyle) !==
        JSON.stringify(this.props.endStyle) ||
      nextProps.startAnimation !== this.props.startAnimation ||
      nextProps.children !== this.props.children ||
      nextState.animationWillEnd !== this.state.animationWillEnd ||
      !!nextProps.forceUpdate
    );
  }

  setAnimationDelay = (
    condition: boolean,
    stateName: string,
    durationSeconds: number,
  ): void => {
    if (!condition) return;
    clearTimeout(this.animationTimeout);
    this.animationTimeout = setTimeout(() => {
      this.setState({
        [stateName]: true,
      });
    }, parseFloat(durationSeconds) * 1000);
  };

  setAnimationDelayAndOnComplete(props: Props) {
    const {
      delaySeconds,
      startAnimation,
      onCompleteStyle,
      durationSeconds,
      onComplete,
    } = props;

    const delayTotalSeconds =
      (parseFloat(delaySeconds) + parseFloat(durationSeconds)) * 1000;

    this.setAnimationDelay(
      !!delaySeconds && startAnimation,
      'animationWillEnd',
      delaySeconds,
    );

    this.setAnimationDelay(
      !!onCompleteStyle && startAnimation,
      'animationWillEnd',
      delayTotalSeconds,
    );

    if (!onComplete) return;

    this.animationCompleteTimeout = setTimeout(() => {
      onComplete();
    }, delayTotalSeconds);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { startAnimation } = nextProps;

    this.setAnimationDelayAndOnComplete(nextProps);

    if (startAnimation !== this.props.startAnimation) {
      this.setState(defaultState);
    }
  }

  componentDidMount() {
    this.setAnimationDelayAndOnComplete(this.props);
  }

  render() {
    const { animationWillEnd } = this.state;
    const {
      children,
      startAnimation,
      startStyle,
      endStyle,
      onCompleteStyle,
      durationSeconds,
      delaySeconds,
      easeType,
      className,
      transition: transitionValue,
      tag,
    } = this.props;
    let style = startStyle;
    let transition = transitionValue
      ? transitionValue
      : `${durationSeconds}s all ${easeType}`;

    if (animationWillEnd || (startAnimation && !delaySeconds)) {
      if (onCompleteStyle) {
        style = onCompleteStyle;
        transition = null;
      } else {
        style = endStyle;
      }
    }

    const propsToChild = {
      className,
      style: {
        ...{
          ...style,
          transition,
        },
      },
    };

    return createElement(tag || 'div', propsToChild, children);
  }
}

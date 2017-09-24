// @flow
import React, { createElement } from 'react';

export const defaultState = {
  animationWillEnd: false,
  animationWillStart: false,
  animationWillComplete: false,
  played: false,
};

type Style = { [string]: string | number };

type Props = {
  startAnimation: boolean,
  children?: any,
  startStyle?: Style,
  endStyle: Style,
  onCompleteStyle?: Style,
  durationSeconds?: number,
  delaySeconds?: number,
  reverseDelaySeconds?: number,
  easeType: string,
  forceUpdate?: boolean,
  tag?: ?string,
  onComplete?: () => mixed,
  className?: string,
  transition?: string,
};

type State = {
  animationWillEnd: boolean,
  animationWillStart: boolean,
  animationWillComplete: boolean,
  played: boolean,
};

let style;

let transition;

export default class Animate extends React.Component<Props, State> {
  static defaultProps = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
    reverseDelaySeconds: 0,
    tag: 'div',
  };

  state = defaultState;

  animationTimeout = null;

  animationCompleteTimeout = null;

  setAnimationDelay = (
    durationSeconds: number,
    phase: 'play' | 'reverse',
  ): void => {
    clearTimeout(this.animationTimeout);

    this.animationTimeout = setTimeout(() => {
      this.setState({
        ...(phase === 'play' ? { animationWillEnd: true } : null),
        ...(phase === 'reverse' ? { animationWillStart: true } : null),
      });
    }, parseFloat(durationSeconds) * 1000);
  };

  setDelayAndOnComplete(
    {
      delaySeconds,
      startAnimation,
      onCompleteStyle,
      durationSeconds,
      onComplete,
      reverseDelaySeconds,
    }: Props,
    isReverse: boolean = false,
  ): void {
    const delayTotalSeconds =
      (parseFloat(delaySeconds) + parseFloat(durationSeconds)) * 1000;

    // delay animation
    if (!!delaySeconds && startAnimation) {
      this.setAnimationDelay(delaySeconds || 0, 'play');
    }

    // reverse animation
    if (isReverse) {
      this.setAnimationDelay(reverseDelaySeconds || 0, 'reverse');
    }

    if ((!onComplete && !onCompleteStyle) || !startAnimation) return;

    this.animationCompleteTimeout = setTimeout(() => {
      if (onComplete) onComplete();
      if (onCompleteStyle) {
        this.setState({
          animationWillComplete: true,
        });
      }
    }, delayTotalSeconds);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { startAnimation, reverseDelaySeconds } = nextProps;
    const isAnimationStatusChanged =
      startAnimation !== this.props.startAnimation;

    if (isAnimationStatusChanged) {
      this.setState({
        ...defaultState,
        played: isAnimationStatusChanged && startAnimation,
      });
    }

    this.setDelayAndOnComplete(
      nextProps,
      isAnimationStatusChanged && !startAnimation && !!reverseDelaySeconds,
    );
  }

  componentDidMount() {
    this.setDelayAndOnComplete(this.props);
  }

  shouldComponentUpdate(
    { startStyle, endStyle, startAnimation, children, forceUpdate }: Props,
    { animationWillEnd, animationWillStart, animationWillComplete }: State,
  ) {
    // only situation that should trigger a re-render
    return (
      JSON.stringify(startStyle) !== JSON.stringify(this.props.startStyle) ||
      JSON.stringify(endStyle) !== JSON.stringify(this.props.endStyle) ||
      startAnimation !== this.props.startAnimation ||
      children !== this.props.children ||
      animationWillEnd !== this.state.animationWillEnd ||
      animationWillStart !== this.state.animationWillStart ||
      animationWillComplete !== this.state.animationWillComplete ||
      !!forceUpdate
    );
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimeout);
    clearTimeout(this.animationCompleteTimeout);
    this.animationTimeout = null;
    this.animationCompleteTimeout = null;
  }

  render() {
    const {
      animationWillEnd,
      animationWillStart,
      animationWillComplete,
      played,
    } = this.state;
    const {
      children,
      startAnimation,
      startStyle,
      endStyle,
      onCompleteStyle,
      durationSeconds = 0.3,
      reverseDelaySeconds,
      delaySeconds,
      easeType,
      className,
      transition: transitionValue,
      tag,
    } = this.props;
    style = startStyle;
    transition = transitionValue || `${durationSeconds}s all ${easeType}`;

    if (!played && reverseDelaySeconds && !startAnimation) {
      style = animationWillStart ? startStyle : endStyle;
    } else if (
      animationWillComplete ||
      animationWillEnd ||
      (startAnimation && !delaySeconds)
    ) {
      if (onCompleteStyle && animationWillComplete) {
        style = onCompleteStyle;
        transition = null;
      } else {
        style = endStyle;
      }
    }

    return createElement(
      tag || 'div',
      {
        className,
        style: {
          ...{
            ...style,
            transition,
          },
        },
      },
      children,
    );
  }
}

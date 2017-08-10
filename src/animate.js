// @flow
import React from 'react';

const defaultState = {
  animationWillEnd: false,
  delayWillEnd: false,
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
  onComplete: () => mixed,
  className?: string,
  transition?: string,
};

type State = {
  animationWillEnd: boolean,
  delayWillEnd: boolean,
};

export default class Animate extends React.Component {
  static defaultProps = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
  };

  props: Props;

  state: State = defaultState;

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
      nextState.delayWillEnd !== this.state.delayWillEnd ||
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

  componentWillReceiveProps(nextProps: Props) {
    const {
      durationSeconds,
      startAnimation,
      onCompleteStyle,
      delaySeconds,
    } = nextProps;

    if (delaySeconds) {
      this.setAnimationDelay(
        !!delaySeconds && startAnimation,
        'animationWillEnd',
        delaySeconds,
      );
    } else if (onCompleteStyle) {
      this.setAnimationDelay(
        !!onCompleteStyle && startAnimation,
        'animationWillEnd',
        durationSeconds,
      );
    }

    if (startAnimation !== this.props.startAnimation) {
      this.setState(defaultState);
    }
  }

  componentDidMount() {
    const { delaySeconds, startAnimation } = this.props;

    this.animationCompleteTimeout = this.setAnimationDelay(
      !!delaySeconds && startAnimation,
      'delayWillEnd',
      delaySeconds,
    );
  }

  onComplete() {
    const { delaySeconds, durationSeconds } = this.props;

    this.animationCompleteTimeout = setTimeout(() => {
      this.props.onComplete();
    }, (parseFloat(delaySeconds) + parseFloat(durationSeconds)) * 1000);
  }

  render() {
    const { animationWillEnd, delayWillEnd } = this.state;
    const {
      children,
      startAnimation,
      startStyle,
      endStyle,
      onCompleteStyle,
      durationSeconds,
      delaySeconds,
      easeType,
      onComplete,
      className,
      transition: transitionValue,
    } = this.props;
    let style = startStyle;
    let transition = transitionValue
      ? transitionValue
      : `${durationSeconds}s all ${easeType}`;

    if (animationWillEnd) {
      if (onCompleteStyle) {
        style = onCompleteStyle;
        transition = null;
      } else {
        style = endStyle;
      }
      if (onComplete) this.onComplete();
    } else if (
      (startAnimation && !delaySeconds) ||
      (delaySeconds && delayWillEnd)
    ) {
      style = endStyle;
      if (onComplete) this.onComplete();
    }

    return (
      <div
        className={className}
        style={{
          ...{
            ...style,
            transition,
          },
        }}
      >
        {children}
      </div>
    );
  }
}

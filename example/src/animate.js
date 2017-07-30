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
  startStyle: Style,
  endStyle: Style,
  onCompleteStyle?: Style,
  durationSeconds?: number,
  delaySeconds: number,
  startReverseAnimate: boolean,
  easeType: string,
  forceUpdate?: boolean,
};

type State = {
  animationWillEnd: boolean,
  delayWillEnd: boolean,
};

export default class Animate extends React.Component {
  // props: Props;

  static defaultProps = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
  };

  state: State = defaultState;

  animationTimeout = null;

  componentWillUnmount() {
    clearTimeout(this.animationTimeout);
    this.animationTimeout = null;
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // only situation that should trigger a re-render
    return (
      nextProps.startAnimation !== this.props.startAnimation ||
      nextState.animationWillEnd !== this.state.animationWillEnd ||
      nextState.delayWillEnd !== this.state.delayWillEnd ||
      nextProps.startReverseAnimate !== this.props.startReverseAnimate ||
      !!nextProps.forceUpdate
    );
  }

  setAnimationDelay = (
    condition: boolean,
    stateName: string,
    duration: number,
  ): void => {
    if (!condition) return;
    clearTimeout(this.animationTimeout);
    this.animationTimeout = setTimeout(() => {
      this.setState({
        [stateName]: true,
      });
    }, duration * 1000);
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
    this.setAnimationDelay(
      !!delaySeconds && startAnimation,
      'delayWillEnd',
      delaySeconds,
    );
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
      startReverseAnimate,
    } = this.props;
    let style = startStyle;

    if (animationWillEnd) {
      style = onCompleteStyle;
    } else if (
      (startAnimation && !delaySeconds) ||
      (delaySeconds && delayWillEnd)
    ) {
      style = startReverseAnimate ? startStyle : endStyle;
    }

    return (
      <div
        style={{
          ...{
            ...style,
            transition: `${durationSeconds}s all ${easeType}`,
          },
        }}
      >
        {children}
      </div>
    );
  }
}

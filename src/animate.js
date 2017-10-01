// @flow
import React from 'react';
import mapChildren from './mapChildren';

export const defaultState = {
  animationWillEnd: false,
  animationWillStart: false,
  animationWillLeave: false,
  animationWillComplete: false,
  played: false,
  childrenStoreInState: null,
};

type Style = { [string]: string | number };

type Props = {
  startAnimation: boolean,
  children?: Array<React$Element<any>> | React$Element<any>,
  startStyle?: Style,
  endStyle: Style,
  leavelStyle: Style,
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
  animationWillLeave: boolean,
  played: boolean,
  childrenStoreInState?: Array<React$Element<any>> | React$Element<any> | null,
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

  state = {
    ...defaultState,
    childrenStoreInState: this.props.children,
  };

  animationTimeout = null;

  animationCompleteTimeout = null;

  animationLeaveTimeout = null;

  setAnimationDelay = (
    timer: number | null,
    durationSeconds: number = 0,
    stateName: string,
    callback?: () => mixed,
  ): void => {
    clearTimeout(timer);

    this.animationTimeout = setTimeout(() => {
      this.setState({
        [stateName]: true,
      });

      if (callback) callback();
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
      this.setAnimationDelay(
        this.animationTimeout,
        delaySeconds,
        'animationWillEnd',
      );
    }

    // reverse animation
    if (isReverse) {
      this.setAnimationDelay(
        this.animationTimeout,
        reverseDelaySeconds,
        'animationWillStart',
      );
    }

    if ((!onComplete && !onCompleteStyle) || !startAnimation) return;

    this.setAnimationDelay(
      this.animationCompleteTimeout,
      delayTotalSeconds,
      'animationWillComplete',
      onComplete,
    );
  }

  compareChildren(nextProps: Props) {
    const { childrenStoreInState } = this.state;
    const { children } = nextProps;

    if (childrenStoreInState && children) {
      mapChildren(childrenStoreInState, children);

      // this.setState({
      //   childrenStoreInState: output,
      // });

      this.setAnimationDelay(
        this.animationLeaveTimeout,
        nextProps.durationSeconds,
        'animationWillLeave',
      );
    }
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

    this.compareChildren(nextProps);
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
    clearTimeout(this.animationLeaveTimeout);
    this.animationTimeout = null;
    this.animationCompleteTimeout = null;
    this.animationLeaveTimeout = null;
  }

  render() {
    const {
      animationWillEnd,
      animationWillStart,
      animationWillComplete,
      played,
      childrenStoreInState,
      animationWillLeave,
    } = this.state;
    const {
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

    const componentProps = {
      className,
      style: {
        ...{
          ...style,
          transition,
        },
      },
    };

    // if (Array.isArray(childrenStoreInState)) {
    //   let output;

    //   if (animationWillLeave) {
    //     // only render those still exsiting;
    //     output = childrenStoreInState.filter((child: string) => {
    //       if (!child.unMount) {
    //         return createElement(
    //           tag || 'div',
    //           { ...componentProps, key: childrenStoreInState[child].key },
    //           child,
    //         );
    //       }
    //     });
    //   } else {
    //     output = childrenStoreInState.map((child: string) => {
    //       return createElement(
    //         tag || 'div',
    //         { ...componentProps, key: childrenStoreInState[child].key },
    //         child,
    //       );
    //     });
    //   }

    //   return React.createElement(tag || 'div', {}, output);
    // }

    return React.createElement(
      tag || 'div',
      componentProps,
      childrenStoreInState,
    );
  }
}

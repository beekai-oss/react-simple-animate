// @flow
import React from 'react';
import propsGenerator from './utils/propsGenerator';
import mapChildren from './utils/mapChildren';

export const defaultState = {
  animationWillEnd: false,
  animationWillStart: false,
  animationWillComplete: false,
  animationWillEnter: false,
  animationWillLeave: false,
  played: false,
  childrenStoreInState: null,
};

export type Style = { [string]: string | number };

export type Props = {
  startAnimation: boolean,
  children?: Array<React$Element<any>> | React$Element<any> | null,
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

export type State = {
  animationWillEnd: boolean,
  animationWillStart: boolean,
  animationWillComplete: boolean,
  animationWillEnter: boolean,
  animationWillLeave: boolean,
  played: boolean,
  childrenStoreInState?: Array<React$Element<any>> | React$Element<any> | null,
};

export default class Animate extends React.Component<Props, State> {
  static defaultProps = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
    reverseDelaySeconds: 0,
    tag: 'div',
  };

  state: State;

  constructor(props: Props) {
    super(props);
    if (props.children) {
      this.state = {
        ...defaultState,
        childrenStoreInState: Array.isArray(props.children)
          ? props.children
          : [props.children],
      };
    }
  }

  animationTimeout = null;

  animationCompleteTimeout = null;

  animationLeaveTimeout = null;

  animationEnterTimeout = null;

  setAnimationDelay = (
    timer: number | null,
    durationSeconds: number = 0,
    stateName: string,
    callback?: () => mixed,
  ): void => {
    clearTimeout(timer);

    timer = setTimeout(() => {
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
    const childrenCount = Array.isArray(children) ? children.length : 1;

    if (
      Array.isArray(childrenStoreInState) &&
      childrenStoreInState.length !== childrenCount
    ) {
      this.setState({
        animationWillEnter: false,
        animationWillLeave: false,
      });
    }

    if (childrenStoreInState && children) {
      const { mappedChildren, willUnMount, willMount } = mapChildren(
        childrenStoreInState,
        children,
      );

      if (mappedChildren.length) {
        this.setState({
          childrenStoreInState: mappedChildren,
        });

        if (willUnMount) {
          this.setAnimationDelay(
            this.animationLeaveTimeout,
            nextProps.durationSeconds,
            'animationWillLeave',
            () => {
              this.setState({
                childrenStoreInState: children,
              });
            },
          );
        }

        if (willMount) {
          this.setAnimationDelay(
            this.animationEnterTimeout,
            0,
            'animationWillEnter',
          );
        }
      }
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

    this.compareChildren(nextProps);

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
    {
      animationWillEnd,
      animationWillStart,
      animationWillComplete,
      animationWillLeave,
      animationWillEnter,
    }: State,
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
      animationWillLeave !== this.state.animationWillLeave ||
      animationWillEnter !== this.state.animationWillEnter ||
      !!forceUpdate
    );
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimeout);
    clearTimeout(this.animationCompleteTimeout);
    clearTimeout(this.animationLeaveTimeout);
    clearTimeout(this.animationEnterTimeout);
    this.animationTimeout = null;
    this.animationCompleteTimeout = null;
    this.animationLeaveTimeout = null;
    this.animationEnterTimeout = null;
  }

  render() {
    const { childrenStoreInState, animationWillLeave } = this.state;
    const { tag } = this.props;

    let componentProps: Object = {};

    if (Array.isArray(childrenStoreInState)) {
      let output = null;

      if (animationWillLeave) {
        output = childrenStoreInState
          .filter((child: any) => !child.willUnmount)
          .map((child: any) => {
            const { key } = child;
            componentProps = propsGenerator(
              {
                ...this.props,
              },
              this.state,
            );

            return React.createElement(
              tag || 'div',
              { ...componentProps, key },
              child,
            );
          });
      } else {
        output = childrenStoreInState.map((child: any) => {
          const { willMount, willUnmount, key } = child;
          componentProps = propsGenerator(
            {
              ...this.props,
            },
            this.state,
            {
              willUnmount,
              willMount,
            },
          );

          return React.createElement(
            tag || 'div',
            { ...componentProps, key },
            child,
          );
        });
      }

      return React.createElement(tag || 'div', {}, output);
    }

    componentProps = propsGenerator(this.props, this.state);

    return React.createElement(
      tag || 'div',
      componentProps,
      childrenStoreInState,
    );
  }
}

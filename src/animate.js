// @flow
import React from 'react';
import propsGenerator from './utils/propsGenerator';
import filterMountOrUnMount from './utils/filterMountOrUnMount';
import mapChildren from './utils/mapChildren';

export const defaultState = {
  animationWillEnd: false,
  animationWillStart: false,
  animationWillComplete: false,
  animationWillEnter: false,
  animationWillLeave: false,
  childrenStoreInState: [],
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
  onError?: (Object, Object) => mixed,
  className?: string,
  transition?: string,
};

export type State = {
  animationWillEnd: boolean,
  animationWillStart: boolean,
  animationWillComplete: boolean,
  animationWillEnter: boolean,
  animationWillLeave: boolean,
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

      return;
    }

    this.state = {
      ...defaultState,
    };
  }

  animationTimeout = null;
  animationCompleteTimeout = null;
  animationLeaveTimeout = null;
  animationEnterTimeout = null;

  setAnimationDelay = (
    durationSeconds: number = 0,
    stateName: string,
    callback?: () => mixed,
  ): number =>
    setTimeout(() => {
      this.setState({
        [stateName]: true,
      });

      if (callback) callback();
    }, parseFloat(durationSeconds) * 1000);

  setDelayAndOnComplete(
    {
      delaySeconds,
      startAnimation,
      onCompleteStyle,
      durationSeconds,
      onComplete,
      reverseDelaySeconds,
    }: Props,
    isReverseWithDelay: boolean = false,
  ): void {
    const delayTotalSeconds =
      (parseFloat(delaySeconds) + parseFloat(durationSeconds)) * 1000;

    // delay animation
    if (!!delaySeconds && startAnimation) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = this.setAnimationDelay(
        delaySeconds,
        'animationWillEnd',
      );
    }

    // reverse animation
    if (isReverseWithDelay) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = this.setAnimationDelay(
        reverseDelaySeconds,
        'animationWillStart',
      );
    }

    if ((!onComplete && !onCompleteStyle) || !startAnimation) return;

    clearTimeout(this.animationCompleteTimeout);
    this.animationCompleteTimeout = this.setAnimationDelay(
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
      const { mappedChildren, willUnMount, willMount } = filterMountOrUnMount(
        childrenStoreInState,
        children,
      );

      if (Array.isArray(mappedChildren)) {
        this.setState({
          childrenStoreInState: mappedChildren,
        });

        if (willUnMount) {
          clearTimeout(this.animationLeaveTimeout);
          this.animationLeaveTimeout = this.setAnimationDelay(
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
          clearTimeout(this.animationEnterTimeout);
          this.animationEnterTimeout = this.setAnimationDelay(
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

  componentDidCatch(error: Object, info: Object) {
    const { onError = false } = this.props;
    if (onError) onError(error, info);
  }

  render() {
    const { childrenStoreInState } = this.state;
    const { tag, children } = this.props;

    let componentProps: Object = {};

    if (Array.isArray(children)) {
      return React.createElement(
        tag || 'div',
        {},
        mapChildren(this.props, this.state),
      );
    }

    componentProps = propsGenerator(this.props, this.state);

    return React.createElement(
      tag || 'div',
      componentProps,
      childrenStoreInState,
    );
  }
}

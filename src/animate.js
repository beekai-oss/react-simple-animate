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
  state: State;

  animationTimeout = null;
  animationCompleteTimeout = null;
  animationLeaveTimeout = null;
  animationEnterTimeout = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      ...defaultState,
      ...(props.children ? { childrenStoreInState: props.children } : null),
    };
  }

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
      parseFloat(delaySeconds) || 0 + parseFloat(durationSeconds) || 0,
      'animationWillComplete',
      onComplete,
    );
  }

  compareChildren(nextProps: Props) {
    const { childrenStoreInState } = this.state;
    const {
      children,
      startAnimation,
      delaySeconds,
      durationSeconds,
    } = nextProps;

    if (!Array.isArray(childrenStoreInState) || !Array.isArray(children)) {
      return;
    }

    if (childrenStoreInState.length !== children.length) {
      const { mappedChildren, willUnmount, willMount } = filterMountOrUnMount(
        childrenStoreInState,
        children,
      );

      this.setState({
        animationWillEnter: false,
        animationWillLeave: false,
        childrenStoreInState: mappedChildren,
      });

      if (willUnmount && startAnimation) {
        clearTimeout(this.animationLeaveTimeout);

        this.animationLeaveTimeout = this.setAnimationDelay(
          durationSeconds,
          'animationWillLeave',
          () => {
            this.setState({
              childrenStoreInState: children,
            });
          },
        );
      }

      if (willMount && startAnimation) {
        clearTimeout(this.animationEnterTimeout);

        this.animationEnterTimeout = this.setAnimationDelay(
          delaySeconds,
          'animationWillEnter',
        );
      }
    } else if (!startAnimation && childrenStoreInState.length === 1) {
      this.setState({
        childrenStoreInState,
      });

      clearTimeout(this.animationEnterTimeout);
      this.animationEnterTimeout = this.setAnimationDelay(
        0,
        'animationWillEnter',
      );
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { startAnimation, reverseDelaySeconds, children } = nextProps;
    const isAnimationStatusChanged =
      startAnimation !== this.props.startAnimation;

    this.setState({
      childrenStoreInState: children,
      ...(isAnimationStatusChanged ? { ...{ ...defaultState } } : null),
    });

    if (Array.isArray(children)) {
      this.compareChildren(nextProps);
    } else {
      this.setDelayAndOnComplete(
        nextProps,
        isAnimationStatusChanged && !startAnimation && !!reverseDelaySeconds,
      );
    }
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
      childrenStoreInState,
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
      (Array.isArray(childrenStoreInState) &&
        Array.isArray(this.state.childrenStoreInState) &&
        childrenStoreInState.length !==
          this.state.childrenStoreInState.length) ||
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
    const { tag, children, className } = this.props;
    const tagName = tag || 'div';

    if (Array.isArray(children)) {
      return React.createElement(
        tagName,
        {
          className,
        }, // need to add the className here
        mapChildren(this.props, this.state),
      );
    }

    return React.createElement(
      tagName,
      propsGenerator(this.props, this.state),
      children,
    );
  }
}

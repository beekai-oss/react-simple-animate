// @flow
import React from 'react';
import propsGenerator from './utils/propsGenerator';
import filterMountOrUnmount from './utils/filterMountOrUnmount';
import mapChildren from './utils/mapChildren';
import setDelayState from './utils/setDelayState';

export const defaultState = {
  willEnd: false,
  willStart: false,
  willComplete: false,
  willEnter: false,
  willLeave: false,
  played: false,
  childrenStoreInState: [],
};

export type Style = { [string]: string | number };

type ChildrenType = Array<React$Element<any>> | React$Element<any> | null;

export type Props = {
  startAnimation: boolean,
  children?: ChildrenType,
  startStyle?: Style,
  endStyle: Style,
  onCompleteStyle?: Style,
  durationSeconds?: number,
  delaySeconds?: number,
  reverseDelaySeconds?: number,
  easeType?: string,
  forceUpdate?: boolean,
  tag?: ?string,
  onComplete?: () => mixed,
  onError?: (Object, Object) => mixed,
  className?: string,
  animateOnAddRemove: boolean,
  transition?: string,
};

export type State = {
  willEnd: boolean,
  willStart: boolean,
  willComplete: boolean,
  willEnter: boolean,
  willLeave: boolean,
  played: boolean,
  childrenStoreInState?: ChildrenType,
};

export default class Animate extends React.Component<Props, State> {
  static displayName = 'ReactSimpleAnimate';

  constructor(props: Props) {
    super(props);
    this.state = {
      ...defaultState,
      ...(props.children ? { childrenStoreInState: props.children } : null),
    };
  }

  componentDidMount() {
    this.setDelayAndOnComplete(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    const {
      startAnimation,
      reverseDelaySeconds,
      children,
      animateOnAddRemove,
    } = nextProps;
    const toggledAnimation = startAnimation !== this.props.startAnimation;

    this.setState({
      ...(toggledAnimation ? { ...{ ...defaultState } } : null),
      childrenStoreInState: children,
      played: toggledAnimation,
    });

    // animation  on mount or unmount
    if (animateOnAddRemove) this.setChildrenState(nextProps);

    this.setDelayAndOnComplete(
      nextProps,
      toggledAnimation && !startAnimation && !!reverseDelaySeconds,
    );
  }

  shouldComponentUpdate(
    { startStyle, endStyle, startAnimation, children, forceUpdate }: Props,
    { willEnd, willStart, willComplete, willLeave, willEnter }: State,
  ) {
    // only situation that should trigger a re-render
    return (
      // object compare can be enahnced, but try to keep it simple here
      JSON.stringify(startStyle) !== JSON.stringify(this.props.startStyle) ||
      JSON.stringify(endStyle) !== JSON.stringify(this.props.endStyle) ||
      startAnimation !== this.props.startAnimation ||
      children !== this.props.children ||
      willEnd !== this.state.willEnd ||
      willStart !== this.state.willStart ||
      willComplete !== this.state.willComplete ||
      willLeave !== this.state.willLeave ||
      willEnter !== this.state.willEnter ||
      !!forceUpdate
    );
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimeout);
    clearTimeout(this.completeTimeout);
    clearTimeout(this.leaveTimeout);
    clearTimeout(this.enterTimeout);
    this.delayTimeout = null;
    this.completeTimeout = null;
    this.leaveTimeout = null;
    this.enterTimeout = null;
  }

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
    clearTimeout(this.delayTimeout);

    if (delaySeconds && startAnimation) {
      this.delayTimeout = setDelayState.call(this, delaySeconds, 'willEnd');
    } else if (isReverseWithDelay) {
      // reverse animation
      this.delayTimeout = setDelayState.call(
        this,
        reverseDelaySeconds,
        'willStart',
      );
    }

    if ((!onComplete && !onCompleteStyle) || !startAnimation) return;

    clearTimeout(this.completeTimeout);
    this.completeTimeout = setDelayState.call(
      this,
      parseFloat(delaySeconds) || 0 + parseFloat(durationSeconds) || 0,
      'willComplete',
      onComplete,
    );
  }

  setChildrenState(nextProps: Props): void {
    const { childrenStoreInState } = this.state;
    const { children, startAnimation, durationSeconds } = nextProps;

    if (
      !Array.isArray(childrenStoreInState) ||
      !Array.isArray(children) ||
      !startAnimation
    ) {
      return;
    }

    if (childrenStoreInState.length !== children.length) {
      const {
        mappedChildren,
        childrenWillUnmount,
        childrenWillMount,
      } = filterMountOrUnmount(childrenStoreInState, children);

      if (childrenWillUnmount && startAnimation) {
        clearTimeout(this.leaveTimeout);
        this.leaveTimeout = setDelayState.call(
          this,
          durationSeconds,
          'willLeave',
          () => {
            this.setState({
              childrenStoreInState: children,
            });
          },
        );
      }

      if (childrenWillMount && startAnimation) {
        clearTimeout(this.enterTimeout);
        this.enterTimeout = setDelayState.call(this, 0, 'willEnter');
      }

      this.setState({
        willEnter: false,
        willLeave: false,
        childrenStoreInState: mappedChildren,
      });
    } else if (!startAnimation) {
      clearTimeout(this.enterTimeout);
      this.enterTimeout = setDelayState.call(this, 0, 'willEnter');

      this.setState({
        childrenStoreInState,
      });
    }
  }

  delayTimeout = null;
  completeTimeout = null;
  leaveTimeout = null;
  enterTimeout = null;

  componentDidCatch(error: Object, info: Object) {
    const { onError = false } = this.props;
    if (onError) onError(error, info);
  }

  render() {
    const { tag, children, animateOnAddRemove } = this.props;
    const tagName = tag || 'div';
    const componentProps = propsGenerator(this.props, this.state);

    return React.createElement(
      tagName,
      componentProps,
      Array.isArray(children) && animateOnAddRemove
        ? mapChildren(this.props, this.state)
        : children,
    );
  }
}

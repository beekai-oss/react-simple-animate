// @flow
import React from 'react';
import propsGenerator from './utils/propsGenerator';
import setDelayState from './utils/setDelayState';

export const defaultState = {
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
  tag?: string,
  onComplete?: () => mixed,
  onError?: (Object, Object) => mixed,
  className?: string,
  animateOnAddRemove: boolean,
  render: Object => any,
  transition?: string,
  refCallback?: (React$Element<any>) => {},
};

export type State = {
  willStart: boolean,
  willComplete: boolean,
  willEnter: boolean,
  willLeave: boolean,
  played: boolean,
  startAnimation: boolean,
  childrenStoreInState?: ChildrenType,
  toggledAnimation: boolean,
};

export default class Animate extends React.PureComponent<Props, State> {
  static displayName = 'ReactSimpleAnimate';

  static defaultProps = {
    startStyle: {},
    onCompleteStyle: undefined,
    durationSeconds: 0.3,
    delaySeconds: 0,
    children: null,
    reverseDelaySeconds: 0,
    easeType: 'linear',
    forceUpdate: false,
    tag: 'div',
    onComplete: undefined,
    onError: undefined,
    className: undefined,
    transition: '',
    refCallback: undefined,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      ...defaultState,
      ...(props.children ? { childrenStoreInState: props.children } : null),
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { startAnimation, children } = nextProps;
    const toggledAnimation = prevState.startAnimation && startAnimation !== prevState.startAnimation;

    return {
      ...(toggledAnimation ? { ...defaultState } : null),
      childrenStoreInState: children,
      played: toggledAnimation,
      startAnimation,
      toggledAnimation,
    };
  }

  componentDidCatch(error: Object, info: Object) {
    const { onError = false } = this.props;
    if (onError) onError(error, info);
  }

  componentWillUnmount() {
    this.delayTimeout && clearTimeout(this.delayTimeout);
    this.completeTimeout && clearTimeout(this.completeTimeout);
    this.leaveTimeout && clearTimeout(this.leaveTimeout);
    this.enterTimeout && clearTimeout(this.enterTimeout);
  }

  setDelayAndOnComplete(isReverseWithDelay: boolean = false): void {
    const {
      delaySeconds,
      startAnimation,
      onCompleteStyle,
      durationSeconds,
      onComplete,
      reverseDelaySeconds,
    } = this.props;
    // delay animation
    this.delayTimeout && clearTimeout(this.delayTimeout);

    if (isReverseWithDelay) {
      // reverse animation
      this.delayTimeout = setDelayState.call(this, reverseDelaySeconds, 'willStart');
    }

    if ((!onComplete && !onCompleteStyle) || !startAnimation) return;

    this.completeTimeout && clearTimeout(this.completeTimeout);
    this.completeTimeout = setDelayState.call(
      this,
      parseFloat(delaySeconds) || parseFloat(durationSeconds) || 0,
      'willComplete',
      onComplete,
    );
  }

  setCurrentChildrenToState = () => {
    this.setState({
      childrenStoreInState: this.props.children,
    });
  };

  delayTimeout = null;
  completeTimeout = null;
  leaveTimeout = null;
  enterTimeout = null;

  render() {
    const { tag, children, render } = this.props;

    const tagName = tag || 'div';
    const componentProps = propsGenerator(this.props, this.state);

    return render ? render(componentProps) : React.createElement(tagName, componentProps, children);
  }
}

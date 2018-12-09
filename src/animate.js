// @flow
import React from 'react';
import attributesGenerator from './utils/attributesGenerator';
import { AnimateContext } from './animateGroup';
import msToSec from './utils/msToSec';

export type Style = { [string]: string | number };

export type AnimationType = {
  play: boolean,
  startStyle?: Style,
  endStyle: Style,
  onCompleteStyle?: Style,
  overlaySeconds?: number,
  durationSeconds?: number,
  reverseDelaySeconds?: number,
  reverseDurationSeconds?: number,
  delaySeconds?: number,
  children?: React.Component<*>,
  forwardedRef?: any,
};

export type AnimationStateType = { [string | number]: AnimationType };

export type Props = {
  easeType?: string,
  tag?: string,
  onComplete?: () => mixed,
  className?: string,
  render?: Object => any,
  sequenceId?: string,
  sequenceIndex?: number,
  register?: any => void,
  animationStates?: AnimationStateType,
} & AnimationType;

export type State = {
  willComplete: boolean,
  play: boolean,
};

export class AnimateChild extends React.PureComponent<Props, State> {
  static displayName = 'Animate';

  static defaultProps = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
    sequenceId: undefined,
    sequenceIndex: undefined,
    animationStates: undefined,
  };

  isMountWithPlay: boolean = false;

  constructor(props: Props) {
    super(props);

    const { play, register } = props;
    register && register(this.props);

    if (play) {
      this.isMountWithPlay = true;

      this.initialPlayTimer = setTimeout(() => {
        this.isMountWithPlay = false;
        this.forceUpdate();
      }, msToSec(props.delaySeconds));
    }
  }

  state: State = {
    willComplete: false,
    play: false,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { animationStates, play, sequenceId, sequenceIndex, onCompleteStyle } = nextProps;
    const id = sequenceId || sequenceIndex;
    let currentPlay = play;

    if (id !== undefined && animationStates && animationStates[id]) {
      const state = animationStates[id];
      currentPlay = state.play;
    }

    return {
      ...(onCompleteStyle && prevState.willComplete
        ? { willComplete: !(play && !prevState.play && prevState.willComplete) }
        : null),
      ...(currentPlay !== prevState.play ? { play: currentPlay } : null),
    };
  }

  componentDidUpdate() {
    const {
      delaySeconds,
      play,
      onCompleteStyle,
      durationSeconds,
      onComplete,
      animationStates,
      sequenceId,
      sequenceIndex,
    } = this.props;
    const id = sequenceId || sequenceIndex;

    if (
      (onComplete || onCompleteStyle) &&
      !this.state.willComplete &&
      (play ||
        (id &&
          animationStates &&
          Object.keys(animationStates).length &&
          animationStates[id] &&
          animationStates[id].play))
    ) {
      clearTimeout(this.completeTimeout);
      this.completeTimeout = setTimeout(() => {
        this.setState({
          willComplete: true,
        });
        onComplete && onComplete();
      }, msToSec(parseFloat(delaySeconds) + parseFloat(durationSeconds)));
    }
  }

  componentWillUnmount() {
    clearTimeout(this.completeTimeout);
    clearTimeout(this.unMountTimeout);
    clearTimeout(this.initialPlayTimer);
  }

  completeTimeout: TimeoutID;

  unMountTimeout: TimeoutID;

  initialPlayTimer: TimeoutID;

  render() {
    const { tag = 'div', children, render } = this.props;

    const props = attributesGenerator(this.props, this.state.willComplete, this.isMountWithPlay);
    return render ? render(props) : React.createElement(tag, props, children);
  }
}

// $FlowIgnoreLine: flow complain about React.forwardRef disable for now
export default React.forwardRef((props: Props, ref) => (
  <AnimateContext.Consumer>
    {({ animationStates = {}, register = undefined }) => (
      <AnimateChild {...{ ...props, animationStates, register }} forwardedRef={ref} />
    )}
  </AnimateContext.Consumer>
));

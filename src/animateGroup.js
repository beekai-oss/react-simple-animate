// @flow
import React, { type Element } from 'react';
import type { AnimationType, AnimationStateType } from './animate';
import calculateTotalDuration from './utils/calculateTotalDuration';

type Sequence = AnimationType & {
  sequenceId?: string,
  sequenceIndex?: string,
};

type Sequences = Array<Sequence>;

type Props = {
  startAnimation: boolean,
  sequences: Sequences,
  children: Element<*>,
};

type State = {
  animationStates?: AnimationStateType,
};

export const AnimateContext = React.createContext({
  animationStates: {},
  register: undefined,
});

export default class AnimateGroup extends React.PureComponent<Props, State> {
  static displayName = 'ReactSimpleAnimateGroup';

  static defaultProps = {
    sequences: [],
  };

  state = {
    animationStates: {},
  };

  componentDidMount() {
    this.props.sequences && this.calculateSequences();
  }

  componentDidUpdate(prevProps: Props) {
    const { sequences, startAnimation } = this.props;
    if (startAnimation !== prevProps.startAnimation && sequences) this.calculateSequences();
  }

  componentWillUnmount() {
    // $FlowIgnoreLine
    Object.values(this.timers).forEach(timer => clearTimeout(timer));
  }

  calculateSequences = () => {
    const { sequences, startAnimation } = this.props;
    const sequencesToAnimate = sequences || Object.values(this.animations);

    (startAnimation ? sequencesToAnimate : [...sequencesToAnimate].reverse()).reduce(
      (previous, current, currentIndex) => {
        const { sequenceId, ...restAttributes } = current;
        const id = sequenceId || currentIndex;
        const totalDuration = calculateTotalDuration(id, this.animations, restAttributes, previous);

        this.timers[id] = setTimeout(() => {
          this.setState(previousState => {
            const stateCopy = { ...previousState.animationStates };

            if (!stateCopy[id]) stateCopy[id] = {};
            Object.entries(restAttributes).forEach(([key, value]) => {
              stateCopy[id][key] = value;
            });
            stateCopy[id].startAnimation = startAnimation;

            return {
              animationStates: stateCopy,
            };
          });
        }, totalDuration);

        return totalDuration;
      },
      0,
    );
  };

  register = (props: Sequence) => {
    const id = props.sequenceId || props.sequenceIndex;
    if (!id) return;

    this.animations[id] = {
      ...props,
    };
  };

  timers: { [string | number]: TimeoutID } = {};
  animations = {};

  render() {
    return (
      <AnimateContext.Provider value={{ animationStates: this.state.animationStates, register: this.register }}>
        {this.props.children}
      </AnimateContext.Provider>
    );
  }
}

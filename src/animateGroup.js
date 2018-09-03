// @flow
import React, { type Element } from 'react';
import type { AnimationType } from './animate';
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
  animationStates: { [string]: AnimationType },
};

export const AnimateContext = React.createContext({
  animationStates: {},
  register: undefined,
});

export default class AnimateGroup extends React.PureComponent<Props, State> {
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
    Object.values(this.timers).forEach((timer: TimeoutID) => clearTimeout(timer));
  }

  timers: { [string]: TimeoutID } = {};
  animations = {};

  calculateSequences = () => {
    const { sequences, startAnimation } = this.props;

    sequences.reduce((previous, current) => {
      const { sequenceId, sequenceIndex, ...restAttributes } = current;
      if (!sequenceId) return previous;
      const id = sequenceId || sequenceIndex;

      const totalDuration = calculateTotalDuration(this.animations, { ...restAttributes, id }, previous);

      this.timers[id] = setTimeout(() => {
        this.setState(previousState => {
          const copy = { ...previousState.animationStates };

          if (!copy[id]) copy[id] = {};
          Object.entries(restAttributes).forEach(([key, value]) => {
            copy[id][key] = value;
          });
          copy[id].startAnimation = startAnimation;

          return {
            animationStates: copy,
          };
        });
      }, totalDuration);

      return totalDuration;
    }, 0);
  };

  register = (props: Sequence) => {
    const id = props.sequenceId || props.sequenceIndex;
    if (!id) return;

    this.animations[id] = {
      ...props,
    };
  };

  render() {
    return (
      <AnimateContext.Provider value={{ animationStates: this.state.animationStates, register: this.register }}>
        {this.props.children}
      </AnimateContext.Provider>
    );
  }
}

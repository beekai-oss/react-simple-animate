// @flow
import React from 'react';
import { AnimateContext } from './animateContext';
import type { AnimationType } from './animate';

type Props = {
  play: boolean,
  sequences: AnimationType,
};

type State = {
  animationStates: Array<AnimationType>,
};

const calculateTotalDuration = (animations, { durationSeconds, delaySeconds, beginEarlySeconds, id }, previous) =>
  (parseFloat(animations[id].durationSeconds || durationSeconds || 0) +
    parseFloat(animations[id].delaySeconds || delaySeconds || 0) -
    parseFloat(beginEarlySeconds || 0)) *
    1000 +
  previous;

export default class AnimateGroup extends React.PureComponent<Props, State> {
  state = {
    animationStates: {},
  };

  componentDidMount() {
    this.props.sequences && this.calculateSequences();
  }

  componentDidUpdate(prevProps: Props) {
    const { sequences, play } = this.props;
    if (play !== prevProps.play && sequences) this.calculateSequences();
  }

  componentWillUnmount() {
    this.timers.forEach(timer => clearTimeout(timer));
  }

  timers = [];
  animations = [];

  calculateSequences = () => {
    const { sequences, play } = this.props;

    sequences.reduce((previous, current) => {
      const { id, ...restAttributes } = current;
      const totalDuration = calculateTotalDuration(this.animations, { ...restAttributes, id }, previous);

      this.timers[id] = setTimeout(() => {
        this.setState(previousState => {
          const copy = { ...previousState.animationStates };

          if (!copy[id]) copy[id] = {};
          Object.entries(restAttributes).forEach(([key, value]) => {
            copy[id][key] = value;
          });
          copy[id].play = play;

          return {
            animationStates: copy,
          };
        });
      }, totalDuration);

      return totalDuration;
    }, 0);
  };

  register = props => {
    this.animations[props.id] = {
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

// @flow
import React from 'react';
import { AnimateContext } from './animateContext';
import type { AnimationType } from './animate';

type SequencesType = AnimationType;

type Props = {
  play: boolean,
  sequences: SequencesType,
};

type State = {
  animationStates: any,
};

export default class AnimateGroup extends React.Component<Props, State> {
  state = {
    animationStates: {},
  };

  componentDidMount() {
    this.props.sequences && this.calculateSequences();
  }

  // shouldComponentUpdate(nextProps: Props) {
  //   console.log(nextProps);
  //   console.log('this.props', this.props);
  //   // return true;
  //   return (
  //     this.props.play !== nextProps.play ||
  //     JSON.stringify(this.props.sequences) !== JSON.stringify(nextProps.sequences)
  //   );
  // }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.play !== prevProps.play) this.calculateSequences();
  }

  componentWillUnmount() {
    this.timers.forEach(timer => clearTimeout(timer));
  }

  timers = [];
  animations = [];

  calculateSequences = () => {
    this.props.sequences.reduce((previous, current) => {
      const { id, ...restAttributes } = current;
      const { durationSeconds, delaySeconds, beginEarlySeconds } = restAttributes;

      const totalDuration =
        (parseFloat(this.animations[id].durationSeconds || durationSeconds || 0) +
          parseFloat(this.animations[id].delaySeconds || delaySeconds || 0) -
          parseFloat(beginEarlySeconds || 0)) *
          1000 +
        previous;

      this.timers[id] = setTimeout(() => {
        this.setState(previousState => {
          const copy = { ...previousState.animationStates };
          if (!copy[id]) copy[id] = {};
          Object.entries(restAttributes).forEach(([key, value]) => {
            copy[id][key] = value;
          });
          copy[id].play = this.props.play;
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

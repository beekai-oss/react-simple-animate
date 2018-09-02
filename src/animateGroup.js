// @flow
import React, { type Element } from 'react';
import type { AnimationType } from './animate';

type Sequence = AnimationType & { id: string };
type Sequences = Array<Sequence>;
type Props = {
  play: boolean,
  sequences: Sequences,
  children: Element<*>,
};
type State = {
  animationStates: { [string]: AnimationType },
};

const calculateTotalDuration = (animations, { durationSeconds, delaySeconds, beginEarlySeconds, id }, previous) => {
  const duration =
    parseFloat(animations[id].durationSeconds || durationSeconds || 0) +
    parseFloat(animations[id].delaySeconds || delaySeconds || 0);
  const withEarlySeconds = duration - parseFloat(beginEarlySeconds || 0);
  const ms = withEarlySeconds * 1000;
  return ms + previous;
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
    const { sequences, play } = this.props;
    if (play !== prevProps.play && sequences) this.calculateSequences();
  }

  componentWillUnmount() {
    // $FlowIgnoreLine
    Object.values(this.timers).forEach((timer: TimeoutID) => clearTimeout(timer));
  }

  timers: { [string]: TimeoutID } = {};
  animations = {};

  calculateSequences = () => {
    const { sequences, play } = this.props;

    sequences.reduce((previous, current) => {
      const { id, ...restAttributes } = current;
      if (!id) return previous;

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

  register = (props: Sequence) => {
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

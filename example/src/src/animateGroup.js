// @flow
import React from 'react';
import { AnimateContext } from './animateContext';

type Props = {
  play: boolean,
  sequences: {
    id: string,
    startStyle: any,
    endStyle: any,
    durationSeconds: any,
    delaySeconds: any,
    beginEarlySeconds: number,
    onCompleteStyle: any,
    onComplete: any,
    easing: any,
    tag: any,
    className: any,
    render: any,
    unMount: any,
    innerRef: any,
  },
};

type State = {
  animationStates: any,
};

export default class AnimateGroup extends React.PureComponent<Props, State> {
  state = {
    animationStates: {},
  };

  componentDidMount() {
    this.calculateSequences();
  }

  animations = [];

  timers = [];

  calculateSequences = () => {
    this.props.sequences.reduce((previous, current) => {
      const { id, ...restAttributes } = current;
      const { durationSeconds, delaySeconds, beginEarlySeconds } = restAttributes;

      const totalDuration =
        (parseFloat(durationSeconds) + parseFloat(delaySeconds) - parseFloat(beginEarlySeconds)) * 1000 + previous;

      this.timers[id].setTimeout(() => {
        this.setState(previousState => {
          const copy = { ...previousState.animationStates };
          if (!copy[id]) copy[id] = {};
          Object.entries(restAttributes).forEach(([key, value]) => {
            copy[id][key] = value;
          });
          return {
            animationStates: copy,
          };
        });
      }, totalDuration);
      return totalDuration;
    }, 0);
  };

  register(attributes) {
    if (this.animations.find(({ id: animationId }) => animationId === attributes.id)) return;
    this.animations.push(attributes);
  }

  render() {
    return (
      <AnimateContext.Provider value={{ animationStates: this.state.animationStates }}>
        {this.props.children}
      </AnimateContext.Provider>
    );
  }
}

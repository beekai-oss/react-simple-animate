// @flow
import React from 'react';
import { AnimateContext } from './animateContext';

type Props = {
  sequence: any,
};

export default class AnimateGroup extends React.PureComponent<Props> {
  componentDidMount() {}

  animations = [];

  appendAnimate(child) {
    this.animations.push(child);
  }

  render() {
    return <AnimateContext.Provider value={this.appendAnimate}>{this.props.children}</AnimateContext.Provider>;
  }
}

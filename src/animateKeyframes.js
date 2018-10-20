// @flow
import React from 'react';
import createStyle from './style/createStyle';
import createRandomName from './utils/createRandomName';

type Props = {
  keyframes: Array<string>,
  easeType?: string,
  durationSeconds?: number,
  render?: Object => any,
  play: boolean,
  pause: boolean,
  delaySeconds?: number,
  direction?: string,
  iterations?: string,
};

type State = {};

const styleTagName = 'style[data-rsi]';

export default class AnimateKeyframes extends React.PureComponent<Props, State> {
  static defaultProps = {
    durationSeconds: 0.3,
    delaySeconds: 0,
    easeType: 'linear',
    render: undefined,
    iterations: 1,
  };

  componentDidMount() {
    const { keyframes, durationSeconds, easeType } = this.props;

    this.componentClassName = createRandomName();
    const styleTag = document.querySelector(styleTagName);
    if (!styleTag) {
      document.head.appendChild(document.createElement(styleTagName));
    }

    styleTag.insertRule(
      createStyle({
        keyframes,
        durationSeconds,
        easeType,
        animationName: createRandomName(),
        className: this.componentClassName,
      }),
      styleTag.sheet.length,
    );
  }

  componentClassName: string;

  render() {
    const { children, play, render, paused } = this.props;
    const className = play ? this.componentClassName : null;
    const style = {
      animationPlayState: paused ? 'paused' : 'running',
    };

    if (render) {
      return render(className, style);
    }

    return <div {...{ className, style }}>{children}</div>;
  }
}

import renderer from 'react-test-renderer';
import React from 'react';
import { AnimateKeyframesChild } from '../src/animateKeyframes';

jest.mock('../src/style/createTag', () => () => 'createTag');
jest.mock('../src/utils/createRandomName', () => () => 'RSI-4dtcsgvdy');

describe('AnimateKeyframesChild', () => {
  const props = {
    keyframes: [],
    play: false,
    animationStates: [],
  };

  it('should render correctly', () => {
    const tree = renderer.create(<AnimateKeyframesChild {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when play set true', () => {
    const tree = renderer.create(<AnimateKeyframesChild {...{ ...props, play: true }} />);
    expect(tree).toMatchSnapshot();
  });
});

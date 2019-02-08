import renderer from 'react-test-renderer';
import React from 'react';
import { shallow } from 'enzyme';
import AnimateKeyframes, { AnimateKeyframesChild } from '../src/animateKeyframes';
import deleteRule from '../src/style/deleteRules';

jest.mock('../src/style/deleteRules');
jest.mock('../src/style/createTag', () => () => 'createTag');
jest.mock('../src/utils/createRandomName', () => () => 'RSI-4dtcsgvdy');

describe('AnimateKeyframesChild', () => {
  const props = {
    keyframes: [],
    play: false,
    animationStates: [],
  };

  it('should render correctly', () => {
    const tree = renderer.create(<AnimateKeyframes {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with AnimateKeyframesChild', () => {
    const tree = renderer.create(<AnimateKeyframesChild {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when render props is supplied', () => {
    const tree = renderer.create(<AnimateKeyframesChild {...{ ...props, render: () => <div /> }} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when play set true', () => {
    const tree = renderer.create(<AnimateKeyframesChild {...{ ...props, play: true }} />);
    expect(tree).toMatchSnapshot();
  });

  it('should update state correctly when animationStates is in the prop', () => {
    const tree = shallow(<AnimateKeyframesChild {...{ ...props, sequenceIndex: 1, play: false }} />);
    tree.setProps({ animationStates: { 1: { play: true } }, play: true });
    expect(tree.state('play')).toBeTruthy();
  });

  it('should remove rules when component is unmount', () => {
    const tree = shallow(<AnimateKeyframesChild {...{ ...props, sequenceIndex: 1, play: false }} />);
    const instance = tree.instance();
    instance.styleTag = {
      sheet: '',
    };
    instance.animationName = '';
    instance.componentWillUnmount();
    expect(deleteRule).toBeCalled();
  });

  it('should call register when component mount', () => {
    const register = jest.fn();
    shallow(<AnimateKeyframesChild {...{ ...props, register }} />);
    expect(register).toBeCalled();
  });
});

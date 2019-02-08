import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import AnimateWrapper, { AnimateChild } from '../src/animate';

jest.mock('../src/utils/attributesGenerator', () => props => props);
jest.useFakeTimers();

const endStyle = { display: 'block' };
const props = {
  play: false,
  endStyle,
};

describe('AnimateWrapper', () => {
  it('should render correctly with minimum props', () => {
    const tree = renderer.create(<AnimateWrapper {...props}>test</AnimateWrapper>);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly by start animation with minimum props', () => {
    const tree = renderer.create(<AnimateWrapper {...{ ...props, play: true }}>test</AnimateWrapper>);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with render props', () => {
    const tree = renderer.create(<AnimateWrapper render={attributes => <div {...attributes}>what</div>} {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render custome tag correctly', () => {
    const tree = renderer.create(<AnimateWrapper {...{ ...props, tag: 'li' }} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('Animate', () => {
  it('should update play state after played', () => {
    const tree = shallow(<AnimateChild {...{ ...props, play: true, endStyle }}>test</AnimateChild>);
    expect(tree.state('play')).toEqual(true);
  });

  it('should update play if animation states contains the sequence index id', () => {
    const tree = shallow(
      <AnimateChild
        {...{
          ...props,
          sequenceIndex: 1,
          animationStates: { 1: { play: true } },
          play: true,
          endStyle,
        }}
      >
        test
      </AnimateChild>,
    );
    expect(tree.state('play')).toEqual(true);
  });

  it('should update play if animation states contains the sequence id', () => {
    const tree = shallow(
      <AnimateChild
        {...{
          ...props,
          sequenceId: 'test',
          animationStates: { test: { play: true } },
          play: true,
          endStyle,
        }}
      >
        test
      </AnimateChild>,
    );
    expect(tree.state('play')).toEqual(true);
  });

  it('should reset willComplete when animation start play', () => {
    const tree = shallow(
      <AnimateChild {...{ ...props, play: false, onCompleteStyle: {}, endStyle }}>test</AnimateChild>,
    );
    expect(tree.state('willComplete')).toEqual(false);
    tree.setProps({ play: true });
    expect(tree.state('willComplete')).toEqual(false);
    jest.runAllTimers();
    expect(tree.state('willComplete')).toEqual(true);
  });

  it('should call on complete function when animation is completed', () => {
    const onComplete = jest.fn();
    const tree = shallow(<AnimateChild {...{ ...props, play: false, onComplete }} />);
    tree.setProps({
      play: true,
    });
    jest.runAllTimers();
    expect(tree.state('willComplete')).toBeTruthy();
    expect(onComplete).toBeCalled();
  });

  it('should clear all timers with component unmount', () => {
    const tree = shallow(<AnimateChild {...{ ...props, play: false }} />);
    const instance = tree.instance();
    window.clearTimeout = jest.fn();
    instance.completeTimeout = 1;
    instance.unMountTimeout = 2;
    instance.initialPlayTimer = 3;
    instance.componentWillUnmount();

    expect(window.clearTimeout).toBeCalledWith(1);
    expect(window.clearTimeout).toBeCalledWith(2);
    expect(window.clearTimeout).toBeCalledWith(3);
  });
});

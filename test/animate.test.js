import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import AnimateWrapper, { AnimateChild } from '../src/animate';

jest.mock('../src/utils/propsGenerator', () => props => props);
jest.useFakeTimers();

const endStyle = { display: 'block' };
const props = {
  startAnimation: false,
  endStyle,
};

describe('AnimateWrapper', () => {
  it('should render correctly with minimum props', () => {
    const tree = renderer.create(<AnimateWrapper {...props}>test</AnimateWrapper>);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly by start animation with minimum props', () => {
    const tree = renderer.create(<AnimateWrapper {...{ ...props, startAnimation: true }}>test</AnimateWrapper>);
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
  it('should update startAnimation state after played', () => {
    const tree = shallow(<AnimateChild {...{ ...props, startAnimation: true, endStyle }}>test</AnimateChild>);
    expect(tree.state('startAnimation')).toEqual(true);
  });

  it('should update startAnimation if animation states contains the sequence index id', () => {
    const tree = shallow(
      <AnimateChild
        {...{
          ...props,
          sequenceIndex: 1,
          animationStates: { 1: { startAnimation: true } },
          startAnimation: true,
          endStyle,
        }}
      >
        test
      </AnimateChild>,
    );
    expect(tree.state('startAnimation')).toEqual(true);
  });

  it('should update startAnimation if animation states contains the sequence id', () => {
    const tree = shallow(
      <AnimateChild
        {...{
          ...props,
          sequenceId: 'test',
          animationStates: { test: { startAnimation: true } },
          startAnimation: true,
          endStyle,
        }}
      >
        test
      </AnimateChild>,
    );
    expect(tree.state('startAnimation')).toEqual(true);
  });

  it('should reset willComplete when animation start play', () => {
    const tree = shallow(
      <AnimateChild {...{ ...props, startAnimation: false, onCompleteStyle: {}, endStyle }}>test</AnimateChild>,
    );
    expect(tree.state('willComplete')).toEqual(false);
    tree.setProps({ startAnimation: true });
    expect(tree.state('willComplete')).toEqual(false);
    jest.runAllTimers();
    expect(tree.state('willComplete')).toEqual(true);
  });

  it('should set shouldUnMount to true when prop have been set to unmount', () => {
    const tree = shallow(<AnimateChild {...{ ...props, startAnimation: false }} />);
    tree.setProps({
      unMount: true,
    });
    jest.runAllTimers();
    expect(tree.state('shouldUnMount')).toBeTruthy();
  });

  it('should call on complete function when animation is completed', () => {
    const onComplete = jest.fn();
    const tree = shallow(<AnimateChild {...{ ...props, startAnimation: false, onComplete }} />);
    tree.setProps({
      startAnimation: true,
    });
    jest.runAllTimers();
    expect(tree.state('willComplete')).toBeTruthy();
    expect(onComplete).toBeCalled();
  });
});

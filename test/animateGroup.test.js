import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import AnimateGroup from '../src/animateGroup';

jest.mock('../src/utils/calculateTotalDuration', () => () => 1);

jest.useFakeTimers();

describe('AnimateGroup', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<AnimateGroup>Test</AnimateGroup>);
    expect(tree).toMatchSnapshot();
  });

  it('should register animation with id or index', () => {
    const tree = shallow(<AnimateGroup>Test</AnimateGroup>);
    tree.instance().register({
      sequenceIndex: 0,
    });
    tree.instance().register({
      sequenceIndex: 2,
    });

    expect(tree.instance().animations).toEqual({
      0: { sequenceIndex: 0 },
      2: { sequenceIndex: 2 },
    });

    // tree.instance().register({
    //   sequenceId: 'test',
    // });
    // tree.instance().register({
    //   sequenceId: 'test1',
    // });

    // expect(tree.instance().animations).toEqual({
    //   0: { sequenceIndex: 0 },
    //   2: { sequenceIndex: 2 },
    //   test: { sequenceId: 'test' },
    //   test1: { sequenceId: 'test1' },
    // });
  });

  it('should not called calculateSequences when component did mount and play is false', () => {
    const calculateSequences = jest.fn();
    const tree = shallow(<AnimateGroup>Test</AnimateGroup>);
    tree.instance().calculateSequences = calculateSequences;
    tree.instance().componentDidMount();
    expect(calculateSequences).not.toBeCalled();
  });

  it('should called calculateSequences when component did mount and play is true', () => {
    const calculateSequences = jest.fn();
    const tree = shallow(<AnimateGroup play>Test</AnimateGroup>);
    tree.instance().calculateSequences = calculateSequences;
    tree.instance().componentDidMount();
    expect(calculateSequences).toBeCalled();
  });

  it('should called calculateSequences when component update from play false to true', () => {
    const calculateSequences = jest.fn();
    const tree = shallow(<AnimateGroup>Test</AnimateGroup>);
    tree.instance().calculateSequences = calculateSequences;
    tree.setProps({
      play: true,
    });
    expect(calculateSequences).toBeCalled();
  });

  describe('calculateSequences', () => {
    it('should accumulate the duration', () => {
      const tree = shallow(<AnimateGroup sequences={[{}, {}]}>Test</AnimateGroup>);
      expect(tree.instance().calculateSequences()).toEqual(2);
    });

    it('should accumulate the duration without sequences instead with animations', () => {
      const tree = shallow(<AnimateGroup>Test</AnimateGroup>);
      tree.instance().animations = {
        test: 'test',
        test1: 'test1',
      };
      expect(tree.instance().calculateSequences()).toEqual(2);
    });

    it('should register timers according to the order of animation sequences', () => {
      const tree = shallow(<AnimateGroup play>Test</AnimateGroup>);
      tree.instance().animations = {
        1: {
          test: 'test1',
          play: false,
        },
        0: {
          test: 'test0',
          play: false,
        },
        234: {
          test: 'test234',
          play: false,
        },
        2: {
          test: 'test2',
          play: false,
        },
      };
      tree.instance().calculateSequences();
      jest.runAllTimers();
      expect(tree.state('animationStates')).toMatchSnapshot();
    });
  });

  it('should register timers according to the reverse order of animation sequences', () => {
    const tree = shallow(<AnimateGroup>Test</AnimateGroup>);
    tree.instance().animations = {
      1: {
        test: 'test1',
        play: false,
      },
      0: {
        test: 'test0',
        play: false,
      },
      234: {
        test: 'test234',
        play: false,
      },
      2: {
        test: 'test2',
        play: false,
      },
    };
    tree.instance().calculateSequences();
    jest.runAllTimers();
    expect(tree.state('animationStates')).toMatchSnapshot();
  });
});

import React from 'react';
import Animate, { defaultState } from '../src/animate';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

const props = {
  startAnimation: true,
  startStyle: {},
  endStyle: {},
  durationSeconds: 1,
  className: 'test',
};

const startStyle = { display: 'inline-block' };
const endStyle = { display: 'block' };
const transition = '1s all linear';

describe('Animate', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Animate {...props}>test</Animate>);

    expect(tree).toMatchSnapshot();
  });

  it('should render custome tag correctly', () => {
    const tree = renderer.create(<Animate {...{ ...props, tag: 'l' }} />);

    expect(tree).toMatchSnapshot();
  });

  describe('when animation is ready and delay have been set', () => {
    it('should play animation with delay', () => {
      const tree = mount(
        <Animate {...{ ...props, delaySeconds: 1 }}>test</Animate>,
      );

      jest.runAllTimers();
      expect(tree.state().animationWillEnd).toEqual(true);
    });
  });

  describe('when animate end style is defined and ready to animate', () => {
    it('should update animation will end state to true', () => {
      const tree = mount(
        <Animate
          {...{
            ...props,
            startAnimation: false,
            onCompleteStyle: endStyle,
          }}
        >
          test
        </Animate>,
      );

      tree.setProps({
        startAnimation: true,
      });

      jest.runAllTimers();
      expect(tree.state().animationWillComplete).toEqual(true);
    });
  });

  it('should update component when animation is ready', () => {
    const tree = shallow(
      <Animate {...{ ...props, startAnimation: false, endStyle }}>
        test
      </Animate>,
    );

    const state = {
      animationWillEnd: false,
    };

    expect(
      tree.instance().shouldComponentUpdate(
        {
          startAnimation: true,
        },
        state,
      ),
    ).toEqual(true);
  });

  it('should not update component when animation already played', () => {
    const tree = shallow(
      <Animate {...{ ...props, startAnimation: false, endStyle }}>
        test
      </Animate>,
    );

    const state = defaultState;

    const nextProps = {
      startAnimation: false,
      children: 'test',
      startStyle: {},
      endStyle,
    };

    expect(
      tree.instance().shouldComponentUpdate(
        {
          startAnimation: true,
        },
        state,
      ),
    ).toEqual(true);

    expect(tree.instance().shouldComponentUpdate(nextProps, state)).toEqual(
      false,
    );
  });

  it('should update component when animation is about to end or delay animation about to end ', () => {
    const tree = shallow(
      <Animate
        {...{ ...props, startAnimation: false, endStyle: { display: 'block' } }}
      >
        test
      </Animate>,
    );

    let state = {
      animationWillEnd: true,
    };

    const nextProps = {
      startAnimation: false,
    };

    expect(tree.instance().shouldComponentUpdate(nextProps, state)).toEqual(
      true,
    );

    state = {
      animationWillEnd: false,
    };

    expect(tree.instance().shouldComponentUpdate(nextProps, state)).toEqual(
      true,
    );
  });

  describe('When animation complete style has been set', () => {
    it('should update the style', () => {
      const onCompleteStyle = {
        display: 'block',
      };
      const tree = shallow(
        <Animate
          {...{
            ...props,
            startAnimation: false,
            onCompleteStyle,
          }}
        >
          test
        </Animate>,
      );

      tree.setState({
        animationWillComplete: true,
      });

      expect(tree.find('div').props().style).toEqual({
        ...onCompleteStyle,
        transition: null,
      });
    });
  });

  describe('when animation about to end', () => {
    it('should update the style', () => {
      const tree = shallow(
        <Animate
          {...{
            ...props,
            startAnimation: true,
            delaySeconds: 0,
            endStyle,
          }}
        >
          test
        </Animate>,
      );

      expect(tree.find('div').props().style).toEqual({
        ...endStyle,
        transition: '1s all linear',
      });
    });
  });

  describe('when delay animation about to end', () => {
    it('should update the style', () => {
      const tree = shallow(
        <Animate
          {...{
            ...props,
            delaySeconds: 1,
            endStyle,
          }}
        >
          test
        </Animate>,
      );

      tree.setState({
        animationWillEnd: true,
      });

      expect(tree.find('div').props().style).toEqual({
        ...endStyle,
        transition: '1s all linear',
      });
    });
  });

  describe('when is animate prop value get changed', () => {
    it('should trigger state reset and clear all timers', () => {
      const clearAllTimers = jest.fn();
      const tree = mount(
        <Animate
          {...{
            ...props,
          }}
        >
          test
        </Animate>,
      );

      tree.instance().clearAllTimers = clearAllTimers;

      tree.setState({
        animationWillEnd: true,
      });

      tree.setProps({
        startAnimation: false,
      });

      expect(tree.state()).toEqual(defaultState);
      expect(clearAllTimers).toBeCalled();
    });
  });

  describe('when force update passed as prop', () => {
    it('should re-render the component', () => {
      const tree = shallow(
        <Animate
          {...{
            ...props,
          }}
        >
          test
        </Animate>,
      );

      const nextProps = {
        ...props,
        forceUpdate: true,
      };

      const nextState = { animationWillEnd: false };

      expect(
        tree.instance().shouldComponentUpdate(nextProps, nextState),
      ).toEqual(true);
    });
  });

  describe('when children component updated', () => {
    it('should trigger re-render', () => {
      const tree = shallow(
        <Animate
          {...{
            ...props,
          }}
        >
          <div>test</div>
        </Animate>,
      );

      const nextProps = {
        ...props,
        children: (
          <div>
            <span>test</span>
          </div>
        ),
      };

      const nextState = { animationWillEnd: false };

      expect(
        tree.instance().shouldComponentUpdate(nextProps, nextState),
      ).toEqual(true);
    });
  });

  describe('when transition have been passed down', () => {
    it('should overwrite the transition style', () => {
      const transition = '1s opacity';
      const tree = shallow(
        <Animate
          {...{
            ...props,
            transition,
          }}
        />,
      );

      expect(tree.find('div').props().style).toEqual({ transition });
    });
  });

  describe('when reverse animation with delay has been set', () => {
    it('should delay animation on reversing', () => {
      const tree = mount(
        <Animate
          {...{
            ...props,
            startAnimation: true,
            reverseDelaySeconds: 0.5,
            startStyle,
            endStyle,
          }}
        >
          test
        </Animate>,
      );

      expect(tree.find('div').props().style).toEqual({
        ...endStyle,
        transition,
      });

      tree.setProps({
        startAnimation: false,
      });

      jest.runAllTimers();

      expect(tree.find('div').props().style).toEqual({
        ...startStyle,
        transition,
      });
    });
  });

  describe('When animation finished and onComplete function is supplied', () => {
    it('should run the onComplete function', () => {
      const onCompleteFunction = jest.fn();
      const tree = mount(
        <Animate
          {...{
            ...props,
            startAnimation: true,
            reverseDelaySeconds: 0.5,
            startStyle,
            endStyle,
            onComplete: onCompleteFunction,
          }}
        >
          test
        </Animate>,
      );

      jest.runAllTimers();

      expect(onCompleteFunction).toBeCalledWith();
    });
  });
});

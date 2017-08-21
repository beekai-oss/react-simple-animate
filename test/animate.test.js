import React from 'react';
import Animate from '../src/animate';
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

const endStyle = { display: 'block' };

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
    it('should trigger animation delay ended', () => {
      const tree = mount(
        <Animate {...{ ...props, delaySeconds: 1 }}>test</Animate>,
      );

      jest.runAllTimers();
      expect(tree.state().animationWillEnd).toEqual(true);
    });
  });

  describe('when animate end style is defined and ready to animate', () => {
    it.only('should trigger animation about to end state', () => {
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
      expect(tree.state().animationWillEnd).toEqual(true);
    });
  });

  it('should update component when animation is ready', () => {
    const tree = shallow(
      <Animate {...{ ...props, startAnimation: false, endStyle: endStyle }}>
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
      <Animate {...{ ...props, startAnimation: false, endStyle: endStyle }}>
        test
      </Animate>,
    );

    const state = {
      animationWillEnd: false,
    };

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

  describe('When animation is about to end', () => {
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
        animationWillEnd: true,
      });

      expect(tree.find('div').props().style).toEqual({
        ...onCompleteStyle,
        transition: null,
      });
    });
  });

  describe('when animation about to end', () => {
    it('should update the style', () => {
      const endStyle = {
        display: 'block',
      };
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
      const endStyle = {
        display: 'block',
      };
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
    it('should trigger state reset', () => {
      const tree = shallow(
        <Animate
          {...{
            ...props,
          }}
        >
          test
        </Animate>,
      );

      tree.setState({
        animationWillEnd: true,
      });

      tree.setProps({
        startAnimation: false,
      });

      expect(tree.state()).toEqual({
        animationWillEnd: false,
      });
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
});

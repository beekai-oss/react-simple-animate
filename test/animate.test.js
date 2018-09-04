import React from 'react';
import AnimateWrapper, { Animate } from '../src/animate';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

jest.mock('../src/utils/propsGenerator', () => props => props);

jest.useFakeTimers();

const startStyle = { display: 'inline-block' };
const endStyle = { display: 'block' };
const transition = '1s all linear';

const props = {
  startAnimation: false,
  endStyle: { display: 'block' },
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
    const tree = shallow(<Animate {...{ ...props, startAnimation: true, endStyle }}>test</Animate>);
    expect(tree.state('startAnimation')).toEqual(true);
  });

  it('should update startAnimation if animation states contains the sequence index id', () => {
    const tree = shallow(
      <Animate
        {...{
          ...props,
          sequenceIndex: 1,
          animationStates: { 1: { startAnimation: true } },
          startAnimation: true,
          endStyle,
        }}
      >
        test
      </Animate>,
    );
    expect(tree.state('startAnimation')).toEqual(true);
  });

  it('should update startAnimation if animation states contains the sequence id', () => {
    const tree = shallow(
      <Animate
        {...{
          ...props,
          sequenceId: 'test',
          animationStates: { test: { startAnimation: true } },
          startAnimation: true,
          endStyle,
        }}
      >
        test
      </Animate>,
    );
    expect(tree.state('startAnimation')).toEqual(true);
  });

  it.only('should reset willComplete when animation start play', () => {
    const tree = shallow(
      <Animate {...{ ...props, startAnimation: false, onCompleteStyle: {}, endStyle }}>test</Animate>,
    );
    expect(tree.state('willComplete')).toEqual(false);
    tree.setProps({ startAnimation: true });
    expect(tree.state('willComplete')).toEqual(false);
    jest.runAllTimers();
    expect(tree.state('willComplete')).toEqual(true);
  });

  // describe('When animation complete style has been set', () => {
  //   it.skip('should update the style', () => {
  //     const onCompleteStyle = {
  //       display: 'block',
  //     };
  //     const tree = shallow(
  //       <Animate
  //         {...{
  //           ...props,
  //           startAnimation: false,
  //           onCompleteStyle,
  //         }}
  //       >
  //         test
  //       </Animate>,
  //     );
  //
  //     tree.setProps({
  //       willComplete: true,
  //     });
  //
  //     jest.runAllTimers();
  //     expect(tree.find('div').props().style).toEqual({
  //       ...onCompleteStyle,
  //       transition: null,
  //     });
  //   });
  // });
  //
  // describe('when animation about to end', () => {
  //   it('should update the style', () => {
  //     const tree = shallow(
  //       <Animate
  //         {...{
  //           ...props,
  //           startAnimation: true,
  //           delaySeconds: 0,
  //           endStyle,
  //         }}
  //       >
  //         test
  //       </Animate>,
  //     );
  //
  //     expect(tree.find('div').props().style).toEqual({
  //       ...endStyle,
  //       transition: '1s all linear',
  //     });
  //   });
  // });
  //
  // describe('when delay animation about to end', () => {
  //   it('should update the style', () => {
  //     const tree = shallow(
  //       <Animate
  //         {...{
  //           ...props,
  //           delaySeconds: 1,
  //           endStyle,
  //         }}
  //       >
  //         test
  //       </Animate>,
  //     );
  //
  //     tree.setState({
  //       willEnd: true,
  //     });
  //
  //     expect(tree.find('div').props().style).toEqual({
  //       ...endStyle,
  //       transition: '1s all linear',
  //     });
  //   });
  // });
  //
  // describe('when is animate prop value get changed', () => {
  //   it('should trigger state reset and clear all timers', () => {
  //     const clearAllTimers = jest.fn();
  //     const tree = mount(
  //       <Animate
  //         {...{
  //           ...props,
  //         }}
  //       >
  //         test
  //       </Animate>,
  //     );
  //
  //     tree.setState({
  //       willEnd: true,
  //     });
  //
  //     tree.setProps({
  //       startAnimation: false,
  //     });
  //
  //     expect(tree.state()).toEqual({
  //       ...defaultState,
  //       played: true,
  //       childrenStoreInState: 'test',
  //     });
  //   });
  // });
  //
  // describe('when force update passed as prop', () => {
  //   it('should re-render the component', () => {
  //     const tree = shallow(
  //       <Animate
  //         {...{
  //           ...props,
  //         }}
  //       >
  //         test
  //       </Animate>,
  //     );
  //
  //     const nextProps = {
  //       ...props,
  //       forceUpdate: true,
  //     };
  //
  //     const nextState = { willEnd: false };
  //
  //     expect(tree.instance().shouldComponentUpdate(nextProps, nextState)).toEqual(true);
  //   });
  // });
  //
  // describe('when children component updated', () => {
  //   it('should trigger re-render', () => {
  //     const tree = shallow(
  //       <Animate
  //         {...{
  //           ...props,
  //         }}
  //       >
  //         <div>test</div>
  //       </Animate>,
  //     );
  //
  //     const nextProps = {
  //       ...props,
  //       children: (
  //         <div>
  //           <span>test</span>
  //         </div>
  //       ),
  //     };
  //
  //     const nextState = { willEnd: false };
  //
  //     expect(tree.instance().shouldComponentUpdate(nextProps, nextState)).toEqual(true);
  //   });
  // });
  //
  // describe('when transition have been passed down', () => {
  //   it('should overwrite the transition style', () => {
  //     const transition = '1s opacity';
  //     const tree = shallow(
  //       <Animate
  //         {...{
  //           ...props,
  //           transition,
  //         }}
  //       />,
  //     );
  //
  //     expect(tree.find('div').props().style).toEqual({ transition });
  //   });
  // });
  //
  // describe('when reverse animation with delay has been set', () => {
  //   it('should delay animation on reversing', () => {
  //     const tree = shallow(
  //       <Animate
  //         {...{
  //           ...props,
  //           startAnimation: true,
  //           reverseDelaySeconds: 0.5,
  //           startStyle,
  //           endStyle,
  //         }}
  //       >
  //         test
  //       </Animate>,
  //     );
  //
  //     expect(tree.find('div').props().style).toEqual({
  //       ...endStyle,
  //       transition,
  //     });
  //
  //     tree.setProps({
  //       startAnimation: false,
  //     });
  //
  //     jest.runAllTimers();
  //
  //     tree.update();
  //
  //     expect(tree.find('div').props().style).toEqual({
  //       ...startStyle,
  //       transition,
  //     });
  //   });
  // });
  //
  // describe('When animation finished and onComplete function is supplied', () => {
  //   it('should run the onComplete function', () => {
  //     const onCompleteFunction = jest.fn();
  //     const tree = mount(
  //       <Animate
  //         {...{
  //           ...props,
  //           startAnimation: true,
  //           reverseDelaySeconds: 0.5,
  //           startStyle,
  //           endStyle,
  //           onComplete: onCompleteFunction,
  //         }}
  //       >
  //         test
  //       </Animate>,
  //     );
  //
  //     jest.runAllTimers();
  //
  //     expect(onCompleteFunction).toBeCalledWith();
  //   });
  // });
  //
  // describe('When children remmoved the component', () => {
  //   it('should remain the same', () => {
  //     const tree = shallow(
  //       <Animate
  //         {...{
  //           ...props,
  //           startAnimation: true,
  //           reverseDelaySeconds: 0.5,
  //           startStyle,
  //           endStyle,
  //         }}
  //       >
  //         <div key={0}>test</div>
  //       </Animate>,
  //     );
  //
  //     tree.setProps({
  //       children: [0, 1].map(i => <div key={i}>test</div>),
  //     });
  //   });
  // });
});

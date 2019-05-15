import * as React from 'react';
import useAnimate from './useAnimate';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

let UseAnimate;

describe('useAnimate', () => {
  let componentStyle;

  const TestHook = ({ callback }) => {
    const { style } = callback();
    componentStyle = style;
    return <div style={style}>errors</div>;
  };

  const TestComponent = callback => {
    mount(<TestHook callback={callback} />);
  };

  beforeEach(() => {
    TestComponent(() => {
      UseAnimate = useAnimate({ end: { opacity: 1 } });
      return UseAnimate;
    });

    jest.resetAllMocks();
  });

  it('should toggle style correctly', () => {
    act(() => {
      expect(UseAnimate.play(true)).toBeUndefined();
      expect(componentStyle).toEqual({
        transition: 'all 0.3s linear 0s',
      });
    });

    expect(componentStyle).toEqual({
      opacity: 1,
      transition: 'all 0.3s linear 0s',
    });
  });
});

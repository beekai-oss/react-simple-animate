import * as React from 'react';
import useAnimateKeyframes from './useAnimateKeyframes';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

jest.mock('./utils/createRandomName', () => ({
  default: () => 'test',
}));

let UseAnimate;

describe('useAnimateKeyframes', () => {
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
      UseAnimate = useAnimateKeyframes({ keyframes: ['opacity: 0', 'opacity: 1'] });
      return UseAnimate;
    });

    jest.resetAllMocks();
  });

  it('should toggle style correctly', () => {
    act(() => {
      expect(UseAnimate.play(true)).toBeUndefined();
      expect(componentStyle).toEqual({ animation: '0.3s linear 0s 1 normal none running ' });
    });

    expect(componentStyle).toEqual({
      animation: '0.3s linear 0s 1 normal none running ',
    });
  });
});

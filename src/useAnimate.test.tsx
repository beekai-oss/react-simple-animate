import * as React from 'react';
import useAnimate from './useAnimate';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers('modern');

let UseAnimate;

describe('useAnimate', () => {
  let componentStyle, onComplete;

  const TestHook = ({
    callback,
  }: {
    callback: () => { style: React.CSSProperties };
  }) => {
    const { style } = callback();
    componentStyle = style;
    return <div style={style}>errors</div>;
  };

  const TestComponent = (callback) => {
    mount(<TestHook callback={callback} />);
  };

  beforeEach(() => {
    onComplete = jest.fn();

    TestComponent(() => {
      UseAnimate = useAnimate({
        end: { opacity: 1 },
        onComplete: () => onComplete(),
      });
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

  it('should call onComplete only when isPlaying', () => {
    onComplete.mockImplementation(() => {
      act(() => {
        UseAnimate.play(false);
      });
    });

    act(() => {
      UseAnimate.play(true);
    });

    jest.runOnlyPendingTimers();

    expect(onComplete).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();

    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});

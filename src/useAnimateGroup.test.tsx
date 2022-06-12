import * as React from 'react';
import { mount } from 'enzyme';
import useAnimateGroup from './useAnimateGroup';
import { act } from 'react-test-renderer';

jest.mock('./utils/createRandomName', () => ({
  default: () => 'test',
}));

let UseAnimateGroup;

describe('useAnimateGroup', () => {
  let componentStyle;

  const TestHook = ({
    callback,
  }: {
    callback: () => { styles: React.CSSProperties };
  }) => {
    const { styles } = callback();
    componentStyle = styles;
    return <div>errors</div>;
  };

  const TestComponent = (callback) => {
    mount(<TestHook callback={callback} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should generate correct styles', () => {
    TestComponent(() => {
      UseAnimateGroup = useAnimateGroup({
        sequences: [
          { start: { opacity: 0 }, end: { opacity: 1 } },
          { keyframes: ['opacity: 0', 'opacity: 1'] },
          { start: { opacity: 0 }, end: { opacity: 1 } },
          { keyframes: ['opacity: 0', 'opacity: 1'] },
        ],
      });
      return UseAnimateGroup;
    });
    expect(componentStyle).toEqual([
      { opacity: 0 },
      undefined,
      { opacity: 0 },
      undefined,
    ]);

    const forwardStyles = [
      { opacity: 1, transition: 'all 0.3s linear 0s' },
      { animation: '0.3s linear 0.3s 1 normal none running test' },
      { opacity: 1, transition: 'all 0.3s linear 0.6s' },
      {
        animation: '0.3s linear 0.8999999999999999s 1 normal none running test',
      },
    ];
    const reverseStyles = [
      { opacity: 0, transition: 'all 0.3s linear 0.8999999999999999s' },
      { animation: '0.3s linear 0.6s 1 normal none running test' },
      { opacity: 0, transition: 'all 0.3s linear 0.3s' },
      {
        animation: '0.3s linear 0s 1 normal none running test',
      },
    ];

    act(() => {
      UseAnimateGroup.play(!UseAnimateGroup.isPlaying);
      expect(componentStyle).toEqual(forwardStyles);
    });

    // NOTE: the next two assertions are added to make sure styles are generated correctly when "play" is called repeatedly
    act(() => {
      UseAnimateGroup.play(!UseAnimateGroup.isPlaying);
      expect(componentStyle).toEqual(reverseStyles);
    });

    act(() => {
      UseAnimateGroup.play(!UseAnimateGroup.isPlaying);
      expect(componentStyle).toEqual(forwardStyles);
    });
  });
});

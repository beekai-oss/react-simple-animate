import { act, renderHook } from '@testing-library/react';
import useAnimateGroup from './useAnimateGroup';

vi.mock('./utils/createRandomName', () => ({
  default: () => 'test',
}));

describe('useAnimateGroup', () => {
  it('should generate correct styles', () => {
    const { result } = renderHook(() =>
      useAnimateGroup({
        sequences: [
          { start: { opacity: 0 }, end: { opacity: 1 } },
          { keyframes: ['opacity: 0', 'opacity: 1'] },
          { start: { opacity: 0 }, end: { opacity: 1 } },
          { keyframes: ['opacity: 0', 'opacity: 1'] },
        ],
      }),
    );

    expect(result.current.styles).toEqual([
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
      result.current.play(true);
    });
    expect(result.current.styles).toEqual(forwardStyles);

    act(() => {
      result.current.play(false);
    });
    expect(result.current.styles).toEqual(reverseStyles);
  });

  it('should update isPlaying after calling play', () => {
    const { result } = renderHook(() => useAnimateGroup({ sequences: [] }));

    act(() => {
      result.current.play(true);
    });
    expect(result.current.isPlaying).toEqual(true);

    act(() => {
      result.current.play(false);
    });
    expect(result.current.isPlaying).toEqual(false);

    act(() => {
      result.current.play(true);
    });
    expect(result.current.isPlaying).toEqual(true);
  });

  it('should use each sequence transition property', () => {
    const { result } = renderHook(() =>
      useAnimateGroup({
        sequences: [
          {
            start: { opacity: 0 },
            end: { opacity: 1 },
            transitionProperty: 'opacity',
          },
        ],
      }),
    );

    act(() => {
      result.current.play(true);
    });

    expect(result.current.styles).toEqual([
      { opacity: 1, transition: 'opacity 0.3s linear 0s' },
    ]);
  });
});

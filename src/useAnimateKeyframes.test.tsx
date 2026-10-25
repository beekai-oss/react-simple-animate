import { act, renderHook } from '@testing-library/react';
import useAnimateKeyframes from './useAnimateKeyframes';

vi.mock('./utils/createRandomName', () => ({
  default: () => 'test',
}));

describe('useAnimateKeyframes', () => {
  it('should toggle style correctly', () => {
    const { result } = renderHook(() =>
      useAnimateKeyframes({
        keyframes: ['opacity: 0', 'opacity: 1'],
      }),
    );

    expect(result.current.style).toEqual({
      animation: '0.3s linear 0s 1 normal none running ',
    });

    act(() => {
      expect(result.current.play(true)).toBeUndefined();
    });

    expect(result.current.style).toEqual({
      animation: '0.3s linear 0s 1 normal none running test',
    });
  });
});

import { act, renderHook } from '@testing-library/react';
import useAnimate from './useAnimate';

vi.useFakeTimers();

describe('useAnimate', () => {
  let onComplete: ReturnType<typeof vi.fn<() => void>>;

  beforeEach(() => {
    onComplete = vi.fn<() => void>();
  });

  it('should toggle style correctly', () => {
    const { result } = renderHook(() =>
      useAnimate({ end: { opacity: 1 }, onComplete }),
    );

    expect(result.current.style).toEqual({
      transition: 'all 0.3s linear 0s',
    });

    act(() => {
      expect(result.current.play(true)).toBeUndefined();
    });

    expect(result.current.style).toEqual({
      opacity: 1,
      transition: 'all 0.3s linear 0s',
    });
  });

  it('should call onComplete only when isPlaying', () => {
    const { result } = renderHook(() =>
      useAnimate({ end: { opacity: 1 }, onComplete }),
    );

    onComplete.mockImplementation(() => {
      act(() => {
        result.current.play(false);
      });
    });

    act(() => {
      result.current.play(true);
    });

    act(() => vi.runOnlyPendingTimers());

    expect(onComplete).toHaveBeenCalledTimes(1);

    act(() => vi.runOnlyPendingTimers());

    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});

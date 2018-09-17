import calculateTotalDuration from '../../src/utils/calculateTotalDuration';

describe('calculateTotalDuration', () => {
  it('should return correctly seconds', () => {
    expect(calculateTotalDuration({ durationSeconds: 1, delaySeconds: 1, overlaySeconds: 1, play: true })).toEqual(
      1000,
    );

    expect(calculateTotalDuration({ durationSeconds: 2, delaySeconds: 1, overlaySeconds: 1, play: true })).toEqual(
      2000,
    );
  });

  it('should return correctly seconds when play on reverse', () => {
    expect(
      calculateTotalDuration({
        durationSeconds: 1,
        reverseDurationSeconds: 2,
        delaySeconds: 1,
        overlaySeconds: 1,
        play: false,
      }),
    ).toEqual(2000);
  });
});

import calculateTotalDuration from '../../src/utils/calculateTotalDuration';

describe('calculateTotalDuration', () => {
  it('should return correctly seconds', () => {
    expect(calculateTotalDuration({ durationSeconds: 1, delaySeconds: 1, play: true })).toEqual(
      2000,
    );

    expect(calculateTotalDuration({ durationSeconds: 2, delaySeconds: 1, play: true })).toEqual(
      3000,
    );
  });

  it('should return correctly seconds when play on reverse', () => {
    expect(
      calculateTotalDuration({
        durationSeconds: 1,
        reverseDurationSeconds: 2,
        delaySeconds: 1,
        play: false,
      }),
    ).toEqual(3000);
  });

  it('should return correctly when those default duration and delay are not supplied', () => {
    expect(
      calculateTotalDuration({
        reverseDurationSeconds: 2,
        play: false,
      }),
    ).toEqual(2000);
  });
});

import calculateTotalDuration from '../../src/utils/calculateTotalDuration';

describe('calculateTotalDuration', () => {
  it('should return correctly seconds', () => {
    expect(calculateTotalDuration({ duration: 1, delay: 1 })).toEqual(2);
  });

  it('should return correctly seconds when play on reverse', () => {
    expect(
      calculateTotalDuration({
        duration: 1,
        delay: 1,
      }),
    ).toEqual(2);
  });

  it('should return correctly when those default duration and delay are not supplied', () => {
    expect(calculateTotalDuration({})).toEqual(0.3);
  });
});

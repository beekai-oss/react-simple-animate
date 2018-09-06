import calculateTotalDuration from '../../src/utils/calculateTotalDuration';

describe('calculateTotalDuration', () => {
  it('should return correctly seconds', () => {
    expect(calculateTotalDuration({ durationSeconds: 1, delaySeconds: 1, overlaySeconds: 1 })).toEqual(1000);

    expect(calculateTotalDuration({ durationSeconds: 2, delaySeconds: 1, overlaySeconds: 1 })).toEqual(2000);
  });
});

import secToMs from './secToMs';

describe('msToSec', () => {
  it('should convert to', () => {
    expect(secToMs(1)).toEqual(1000);
  });
});

import secToMs from './secToMs';

describe('secToMs', () => {
  it('should convert to', () => {
    expect(secToMs(1)).toEqual(1000);
  });
});

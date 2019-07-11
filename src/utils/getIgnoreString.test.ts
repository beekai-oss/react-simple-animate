import getIgnoreString from './getIgnoreString';

describe('[Function] getIgnoreString', () => {
  it('should return empty string when the array is empty', () => {
    expect(getIgnoreString([])).toEqual('');
  })
  it('should return css style string', () => {
    expect(getIgnoreString(['transform'])).toEqual(', transform 0s');
    expect(getIgnoreString(['backgroundColor'])).toEqual(', background-color 0s');
    expect(getIgnoreString(['top', 'bottom'])).toEqual(', top 0s, bottom 0s');
  });
});

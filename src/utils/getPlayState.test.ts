import getPlayState from './getPlayState';

describe('getPlayState', () => {
  it('should return correct value', () => {
    expect(getPlayState(true)).toEqual('running');
    expect(getPlayState(false)).toEqual('paused');
  });
});

import getPlayState from './getPauseState';

describe('getPlayState', () => {
  it('should return correct value', () => {
    expect(getPlayState(true)).toEqual('paused');
    expect(getPlayState(false)).toEqual('running');
  });
});

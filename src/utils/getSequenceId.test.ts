import getSequenceId from './getSequenceId';

describe('getSequenceId', () => {
  it('should return 0 when both undefined', () => {
    expect(getSequenceId(undefined, undefined)).toEqual(0);
  });

  it('should return sequence index when defined', () => {
    expect(getSequenceId(1, undefined)).toEqual(1);
  });

  it('should return sequence id when defined', () => {
    expect(getSequenceId(undefined, '2')).toEqual('2');
  });

  it('should return default when nothing defined', () => {
    expect(getSequenceId(undefined, undefined, 2)).toEqual(2);
  });
});

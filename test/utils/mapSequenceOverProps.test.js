import mapSequenceOverProps from '../../src/utils/mapSequenceOverProps';

describe('mapSequenceOverProps', () => {
  it('should return default props', () => {
    expect(mapSequenceOverProps({}, 'test1')).toEqual({});
    expect(mapSequenceOverProps({ animationStates: { what: 'test' } }, 'test1')).toEqual({
      animationStates: { what: 'test' },
    });
    expect(mapSequenceOverProps({ animationStates: { what: 'test' } }, '')).toEqual({
      animationStates: { what: 'test' },
    });
  });

  it('should overwrite animationState props', () => {
    expect(mapSequenceOverProps({ animationStates: { test: { start: 'test1' } }, start: 'test2' }, 'test')).toEqual({
      start: 'test2',
    });
  });
});

import camelCaseToDash from './camelCaseToDash';

describe('[Function] camelCaseToDash', () => {
  it('should return empty string when the string is empty', () => {
    expect(camelCaseToDash('')).toEqual('');
  })
  it('should return correct string', () => {
    expect(camelCaseToDash('transform')).toEqual('transform');
    expect(camelCaseToDash('backgroundColor')).toEqual('background-color');
  });
});
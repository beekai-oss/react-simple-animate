import camelCaseToDash from './camelCaseToDash';

describe('camelCaseToDash', () => {
  it('should transfer camel case string to dash', () => {
    expect(camelCaseToDash('backgroundColor')).toEqual('background-color');
  });

  it('should return empty when given null or undefined or empty string', () => {
    expect(camelCaseToDash('')).toEqual('');
    expect(camelCaseToDash()).toEqual('');
  });
});

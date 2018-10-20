import createStyle from '../../src/style/createStyle';

describe('createStyle', () => {
  it('should create correct style', () => {
    expect(createStyle({
      keyframes: ['opacity: 0', 'opacity: 1', 'opacity: 2', 'opacity: 3'],
      animationName: 'test',
      className: 'bill',
    })).toMatchSnapshot();
  });
});

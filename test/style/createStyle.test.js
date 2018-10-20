import createStyle from '../../src/style/createStyle';

describe('test', () => {
  it('test', () => {
    const output = createStyle({
      keyframes: ['opacty: 0', 'opacity: 1', 'opacyt: 2', 'opacity: 3'],
      animationName: 'test',
      className: 'bill',
    });
  });
});

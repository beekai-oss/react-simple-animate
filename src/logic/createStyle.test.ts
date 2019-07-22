import createStyle from './createStyle';

describe('createStyle', () => {
  it('should create correct style', () => {
    expect(
      createStyle({
        keyframes: ['opacity: 0;', 'opacity: 1;', 'opacity: 2;', 'opacity: 3;'],
        animationName: 'test',
      }),
    ).toMatchSnapshot();
  });

  it('should create correct style with object', () => {
    expect(
      createStyle({
        keyframes: [
          { 0: 'opacity: 0;' },
          { 25: 'opacity: 1;' },
          { 75: 'opacity: 2;' },
          { 100: 'opacity: 3;' },
        ],
        animationName: 'test',
      }),
    ).toMatchSnapshot();
  });

  it('should create correct style  keyframe object', () => {
    expect(
      createStyle({
        keyframes: [
          { opacity: 0 },
          { opacity: 0.25 },
          { opacity: 0.5 },
          { opacity: 0.75 },
          { opacity: 1 },
        ],
        animationName: 'test',
      }),
    ).toMatchSnapshot();
  });
});

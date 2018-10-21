import createTag from '../../src/style/createTag';

jest.mock('../../src/style/createStyle', () => () => 'test');

const documentCreateOriginal = document.createElement;
const appendChildOriginal = document.head.appendChild;

describe('createTag', () => {
  beforeEach(() => {
    document.createElement = jest.fn();
    document.head.appendChild = jest.fn();
  });

  afterEach(() => {
    document.createElement = documentCreateOriginal;
    document.head.appendChild = appendChildOriginal;
  });

  it('should the tag and total length of css rules', () => {
    const insertRule = jest.fn();
    document.createElement.mockReturnValue({ sheet: { cssRules: [1, 2], insertRule }, setAttribute: () => {} });
    const output = createTag({ keyframes: '', animationName: 'test' });

    expect(insertRule).toBeCalled();
    expect(output).toMatchSnapshot();
  });

  it('should still return tag and index even insertRule thow error', () => {
    const insertRule = () => {
      throw new Error('failed');
    };
    document.createElement.mockReturnValue({ sheet: { cssRules: [1, 2], insertRule }, setAttribute: () => {} });
    const output = createTag({ keyframes: '', animationName: 'test' });

    expect(output).toMatchSnapshot();
  });
});

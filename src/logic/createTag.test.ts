import createTag from './createTag';

vi.mock('./createStyle', () => ({
  default: () => '.test {}',
}));

const documentCreateOriginal = document.createElement;
const appendChildOriginal = document.head.appendChild;

describe('createTag', () => {
  beforeEach(() => {
    document.createElement = vi.fn();
    document.head.appendChild = vi.fn();
  });

  afterEach(() => {
    document.createElement = documentCreateOriginal;
    document.head.appendChild = appendChildOriginal;
  });

  it('should the tag and total length of css rules', () => {
    const insertRule = vi.fn();
    // @ts-expect-error
    document.createElement.mockReturnValue({
      sheet: { cssRules: [1, 2], insertRule },
      setAttribute: () => {},
    });
    // @ts-expect-error
    const output = createTag({ keyframes: {}, animationName: 'test' });

    expect(output).toMatchSnapshot();
  });

  it('should still return tag and index even insertRule thow error', () => {
    const insertRule = () => {
      throw new Error('failed');
    };
    // @ts-expect-error
    document.createElement.mockReturnValue({
      sheet: { cssRules: [1, 2], insertRule },
      setAttribute: () => {},
    });
    // @ts-expect-error
    const output = createTag({ keyframes: '', animationName: 'test' });

    expect(output).toMatchSnapshot();
  });
});

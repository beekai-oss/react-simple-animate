import propsGenerator from '../../src/utils/propsGenerator';

jest.mock('../../src/utils/mapSequenceOverProps', () => props => props);

describe('propsGenerator', () => {
  const state = {
    willComplete: false,
  };

  const props = {
    startStyle: {
      display: 'none',
    },
    endStyle: {
      display: 'block',
    },
    easeType: 'ease',
    startAnimation: false,
  };

  const startStyleWithTransition = {
    ...props.startStyle,
    transition: 'all 0.3s ease 0s',
  };

  const endStyleWithTransition = {
    ...props.endStyle,
    transition: 'all 0.3s ease 0s',
  };

  it('should generate startStyle', () => {
    expect(propsGenerator(props, state).style).toEqual(startStyleWithTransition);
  });

  describe('when animation is set to true', () => {
    it('should generate endStyle', () => {
      expect(propsGenerator({ ...props, startAnimation: true }, state).style).toEqual(endStyleWithTransition);
    });
  });

  describe('when animation reverseDelaySeconds has been set', () => {
    it('should render the end style', () => {
      expect(propsGenerator({ ...props, startAnimation: false, reverseDelaySeconds: 0.3 }, state).style).toEqual({
        ...startStyleWithTransition,
        transition: 'all 0.3s ease 0.3s',
      });
    });
  });

  it('should render start style when delay second is set and animation about to start', () => {
    expect(propsGenerator({ ...props, startAnimation: true, delaySeconds: 0.3 }, state).style).toEqual({
      ...endStyleWithTransition,
      transition: 'all 0.3s ease 0.3s',
    });
  });

  it('should apply onComplete style', () => {
    expect(
      propsGenerator(
        { ...props, startAnimation: true, delaySeconds: 0.3, onCompleteStyle: { display: 'inline' } },
        { willComplete: true },
      ).style,
    ).toEqual({
      display: 'inline',
      transition: '',
    });
  });

  it('should apply end style when animationStates is set with startAnimation', () => {
    expect(
      propsGenerator(
        {
          ...props,
          animationStates: { test: { startAnimation: true } },
          sequenceId: 'test',
        },
        state,
      ).style,
    ).toEqual(endStyleWithTransition);

    expect(
      propsGenerator(
        {
          ...props,
          animationStates: { 1: { startAnimation: true } },
          sequenceIndex: 1,
        },
        state,
      ).style,
    ).toEqual(endStyleWithTransition);
  });

  it('should set up refCallback if it is part of the prop', () => {
    const refCallback = jest.fn();

    expect(
      propsGenerator(
        {
          refCallback,
        },
        state,
      ),
    ).toMatchSnapshot();
  });
});

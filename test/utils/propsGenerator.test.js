import propsGenerator from '../../src/utils/propsGenerator';

describe('propsGenerator', () => {
  const state = {
    willEnd: false,
    willStart: false,
    willComplete: false,
    willEnter: false,
    willLeave: false,
    played: false,
  };

  const props = {
    startStyle: {
      display: 'none',
    },
    endStyle: {
      display: 'block',
    },
    startAnimation: false,
  };

  const startStyleWithTransition = {
    ...props.startStyle,
    transition: '0.3s all linear',
  };

  const endStyleWithTransition = {
    ...props.endStyle,
    transition: '0.3s all linear',
  };

  it('should generate startStyle', () => {
    expect(propsGenerator(props, state).style).toEqual(
      startStyleWithTransition,
    );
  });

  describe('when animation is set to true', () => {
    it('should generate endStyle', () => {
      expect(
        propsGenerator({ ...props, startAnimation: true }, state).style,
      ).toEqual(endStyleWithTransition);
    });
  });

  describe('when item about to mount', () => {
    it('should render the start style', () => {
      expect(
        propsGenerator({ ...props, startAnimation: true }, state, {
          willMount: true,
        }).style,
      ).toEqual(startStyleWithTransition);
    });

    it('should render the end style when state set animation about to enter', () => {
      expect(
        propsGenerator(
          { ...props, startAnimation: true },
          { ...state, willEnter: true },
          { willMount: true },
        ).style,
      ).toEqual(endStyleWithTransition);
    });
  });

  describe('when item about to unmount', () => {
    it('should render the start style', () => {
      expect(
        propsGenerator({ ...props, startAnimation: true }, state, {
          willUnmount: true,
        }).style,
      ).toEqual(startStyleWithTransition);
    });

    it('should render the end style when state set animation about to leave', () => {
      expect(
        propsGenerator(
          { ...props, startAnimation: true },
          { ...state, willLeave: true },
          { willUnmount: true },
        ).style,
      ).toEqual(endStyleWithTransition);
    });
  });

  describe('when animation reverseDelaySeconds has been set', () => {
    it('should render the end style', () => {
      expect(
        propsGenerator(
          { ...props, startAnimation: true, reverseDelaySeconds: 0.3 },
          state,
        ).style,
      ).toEqual(endStyleWithTransition);
    });

    it('should render the end style when state set animation about to leave', () => {
      expect(
        propsGenerator(
          { ...props, startAnimation: false, reverseDelaySeconds: 0.3 },
          { ...state, willStart: true },
        ).style,
      ).toEqual(startStyleWithTransition);
    });
  });

  it('should render end style when willEnd is set to true', () => {
    expect(
      propsGenerator(
        { ...props, startAnimation: true },
        { ...state, willEnd: true },
      ).style,
    ).toEqual(endStyleWithTransition);
  });

  it('should render start style when delay second is set and animation about to start', () => {
    expect(
      propsGenerator(
        { ...props, startAnimation: true, delaySeconds: 0.3 },
        state,
      ).style,
    ).toEqual(startStyleWithTransition);
  });

  it('should render complete style and set transition to null', () => {
    expect(
      propsGenerator(
        {
          ...props,
          onCompleteStyle: {
            display: 'flex',
          },
        },
        { ...state, willComplete: true },
      ).style,
    ).toEqual({ display: 'flex', transition: null });
  });
});

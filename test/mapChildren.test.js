import mapChildren from '../src/mapChildren';

describe('mapChildren', () => {
  it('should mark child is about to be unMount', () => {
    const elements = [
      {
        key: 1,
      },
      {
        key: 2,
      },
    ];
    const children = [
      {
        key: 1,
      },
    ];

    expect(mapChildren(elements, children)).toMatchSnapshot();
  });

  it('should append new children', () => {
    const elements = [
      {
        key: 1,
      },
      {
        key: 2,
      },
      {
        key: 3,
      },
    ];
    const children = [
      {
        key: 0,
      },
      {
        key: 1,
      },
      {
        key: 4,
      },
      {
        key: 6,
      },
      {
        key: 3,
      },
      {
        key: 5,
      },
    ];

    expect(mapChildren(elements, children)).toMatchSnapshot();
  });

  it('should work fine with object', () => {
    const elements = {
      key: 1,
    };
    const children = {
      key: 0,
    };
    expect(mapChildren(elements, children)).toMatchSnapshot();
  });

  it('should work correctly when noting changed', () => {
    const elements = {
      key: 1,
    };
    const children = {
      key: 1,
    };
    expect(mapChildren(elements, children)).toMatchSnapshot();
  });

  it('should work fine when all deleted', () => {
    const elements = {
      key: 1,
    };
    const children = {};
    expect(mapChildren(elements, children)).toMatchSnapshot();
  });

  it('should work fine by adding new child when children were empty', () => {
    const elements = {};
    const children = {
      key: 1,
    };
    expect(mapChildren(elements, children)).toMatchSnapshot();
  });

  it('should work fine with both empty', () => {
    const elements = {};
    const children = {};
    expect(mapChildren(elements, children)).toMatchSnapshot();
  });
});

import filterMountOrUnMount from '../../src/utils/filterMountOrUnmount';

describe('filterMountOrUnMount', () => {
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

    expect(filterMountOrUnMount(elements, children)).toMatchSnapshot();
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

    expect(filterMountOrUnMount(elements, children)).toMatchSnapshot();
  });
});

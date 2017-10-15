import mapChildren from '../../src/utils/mapChildren';

describe('mapChildren', () => {
  it('should return null when childrenStoreInState is null', () => {
    expect(
      mapChildren(
        {
          children: null,
        },
        {
          childrenStoreInState: null,
        },
      ),
    ).toBe(null);
  });

  describe('when willLeave set to true', () => {
    it('should filter out components which will unmont', () => {
      expect(
        mapChildren(
          {},
          {
            willLeave: true,
            childrenStoreInState: [
              {
                willUnmount: true,
              },
            ],
          },
        ),
      ).toMatchSnapshot();
    });
  });

  describe('when willLeave set to false', () => {
    it('should not filter components', () => {
      expect(
        mapChildren(
          {},
          {
            willLeave: false,
            childrenStoreInState: [
              {
                willUnmount: true,
              },
            ],
          },
        ),
      ).toMatchSnapshot();
    });
  });
});

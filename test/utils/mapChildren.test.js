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

  describe('when animationWillLeave set to true', () => {
    it('should filter out components which will unmont', () => {
      expect(
        mapChildren(
          {},
          {
            animationWillLeave: true,
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

  describe('when animationWillLeave set to false', () => {
    it('should not filter components', () => {
      expect(
        mapChildren(
          {},
          {
            animationWillLeave: false,
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

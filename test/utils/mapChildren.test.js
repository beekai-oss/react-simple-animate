import mapChildren from '../../src/utils/mapChildren';
import Animate from '../../src/animate';
import React from 'react';

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
          {
            children: [],
          },
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
          {
            children: [],
          },
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

  describe('when children is Animate component', () => {
    const animateComponent = <Animate />;

    it('should apply startAnimation', () => {
      expect(
        mapChildren(
          {
            children: [],
          },
          {
            childrenStoreInState: [{ ...animateComponent }],
          },
        ),
      ).toMatchSnapshot();
    });

    it('should apply startAnimation according to willEnter state', () => {
      expect(
        mapChildren(
          {
            children: [],
          },
          {
            willEnter: false,
            childrenStoreInState: [{ ...animateComponent, willMount: true }],
          },
        ),
      ).toMatchSnapshot();

      expect(
        mapChildren(
          {
            children: [{ ...animateComponent, willMount: true }],
          },
          {
            willEnter: true,
            childrenStoreInState: [{ ...animateComponent, willMount: true }],
          },
        ),
      ).toMatchSnapshot();
    });

    it('should apply startAnimation according to willLeave state', () => {
      expect(
        mapChildren(
          {
            children: [],
          },
          {
            willLeave: false,
            childrenStoreInState: [{ ...animateComponent, willUnmount: true }],
          },
        ),
      ).toMatchSnapshot();

      expect(
        mapChildren(
          {
            children: [],
          },
          {
            willLeave: true,
            childrenStoreInState: [{ ...animateComponent, willUnmount: true }],
          },
        ),
      ).toMatchSnapshot();
    });
  });
});

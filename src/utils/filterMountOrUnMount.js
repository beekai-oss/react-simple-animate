// @flow
type Result = {
  mappedChildren: Array<any>,
  willUnmount: boolean,
  willMount: boolean,
};

export default function filterMountOrUnMount(
  childrenStoreInState: Object | Array<React$Element<any>>,
  children: Object | Array<React$Element<any>>,
): Result {
  const defaultState = {
    willUnmount: false,
    willMount: false,
  };
  const result: Result = {
    mappedChildren: [],
    ...{ ...defaultState },
  };
  const childrenShallowCopy = Array.isArray(children) ? children : [children];
  const childrenStoreInStateShallowCopy = Array.isArray(childrenStoreInState)
    ? childrenStoreInState
    : [childrenStoreInState];

  // any children got removed
  result.mappedChildren = childrenStoreInStateShallowCopy.map(
    (element: React$Element<any>) => {
      if (!element || !Object.prototype.hasOwnProperty.call(element, 'key')) {
        return null;
      }

      if (
        childrenShallowCopy.find(child => child && child.key === element.key)
      ) {
        return {
          ...element,
          ...{ ...defaultState },
        };
      }

      result.willUnmount = true;
      return {
        ...element,
        willUnmount: true,
      };
    },
  );

  // append missing child
  childrenShallowCopy.forEach((child, index) => {
    if (
      child &&
      Object.prototype.hasOwnProperty.call(child, 'key') &&
      !result.mappedChildren.find(r => r && r.key === child.key)
    ) {
      result.willMount = true;
      result.mappedChildren.splice(index === 0 ? 0 : index + 1, 0, {
        ...child,
        willMount: true,
      });
    }
  });

  return result;
}

// @flow
type Result = {
  mappedChildren: Array<any>,
  willUnMount: boolean,
  willMount: boolean,
};

export default function filterMountOrUnMount(
  childrenStoreInState: Object | Array<React$Element<any>>,
  children: Object | Array<React$Element<any>>,
): Result {
  const result: Result = {
    mappedChildren: [],
    willUnMount: false,
    willMount: false,
  };
  const childrenShallowCopy = Array.isArray(children) ? children : [children];
  const childrenStoreInStateShallowCopy = Array.isArray(childrenStoreInState)
    ? childrenStoreInState
    : [childrenStoreInState];

  // any children got removed
  childrenStoreInStateShallowCopy.forEach((element: React$Element<any>) => {
    if (!element || !Object.prototype.hasOwnProperty.call(element, 'key')) {
      return result.mappedChildren.push(null);
    }

    if (childrenShallowCopy.find(child => child && child.key === element.key)) {
      result.mappedChildren.push({
        ...element,
        willUnmount: false,
        willMount: false,
      });
      return null;
    }

    result.willUnMount = true;
    result.mappedChildren.push({
      ...element,
      willUnmount: true,
    });
    return null;
  });

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

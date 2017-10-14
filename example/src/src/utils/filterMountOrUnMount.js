// @flow
type Result = {
  mappedChildren: Array<any>,
  willUnmount: boolean,
  willMount: boolean,
};

const findChild = (children, child) =>
  children.find(r => r && r.key === child.key);

export default function filterMountOrUnmount(
  childrenStoreInState: Array<React$Element<any>>,
  children: Array<React$Element<any>>,
): Result {
  const defaultState = {
    willUnmount: false,
    willMount: false,
  };
  const result: Result = {
    mappedChildren: [],
    ...{ ...defaultState },
  };

  // any children got removed
  result.mappedChildren = childrenStoreInState.map(
    (child: React$Element<any>) => {
      if (!child || !Object.prototype.hasOwnProperty.call(child, 'key')) {
        return null;
      }

      if (findChild(children, child)) {
        return {
          ...child,
          ...{ ...defaultState },
        };
      }

      result.willUnmount = true;
      return {
        ...child,
        willUnmount: true,
      };
    },
  );

  // append missing child
  children.forEach((child, index) => {
    if (
      child &&
      Object.prototype.hasOwnProperty.call(child, 'key') &&
      !findChild(result.mappedChildren, child)
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

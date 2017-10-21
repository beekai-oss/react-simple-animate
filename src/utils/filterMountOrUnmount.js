// @flow
type Result = {
  mappedChildren: Array<any>,
  childrenWillUnmount: boolean,
  childrenWillMount: boolean,
};

const findChild = (children, child) =>
  children.find(r => r && r.key === child.key);

const childDefaultState = {
  willUnmount: false,
  willMount: false,
};

export default function filterMountOrUnmount(
  childrenStoreInState: Array<React$Element<any>>,
  children: Array<React$Element<any>>,
): Result {
  const result: Result = {
    mappedChildren: [],
    childrenWillUnmount: false,
    childrenWillMount: false,
  };

  // any children got removed
  result.mappedChildren = childrenStoreInState.map(
    (child: React$Element<any>) => {
      if (!child || !Object.prototype.hasOwnProperty.call(child, 'key')) {
        return null;
      }

      if (!findChild(children, child)) result.childrenWillUnmount = true;

      return {
        ...child,
        ...(findChild(children, child)
          ? { ...childDefaultState }
          : { willUnmount: true }),
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
      result.childrenWillMount = true;
      result.mappedChildren.splice(index === 0 ? 0 : index + 1, 0, {
        ...child,
        willMount: true,
      });
    }
  });

  return result;
}

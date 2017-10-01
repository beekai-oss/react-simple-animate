// @flow

export default function mapChildren(
  childrenStoreInState: Object | Array<any>,
  children: Object | Array<any>,
) {
  let previousIndex: number = 0;
  const result: Array<any> = [];
  const childrenShallowCopy = Array.isArray(children) ? children : [children];
  const childrenStoreInStateShallowCopy = Array.isArray(childrenStoreInState)
    ? childrenStoreInState
    : [childrenStoreInState];

  // any children got removed
  childrenStoreInStateShallowCopy.forEach((element: Object) => {
    if (!element.hasOwnProperty('key')) return;

    if (childrenShallowCopy.find(child => child.key === element.key)) {
      result.push(element);
    } else {
      result.push({ ...element, willUnmount: true });
    }
  });

  // append missing child
  childrenShallowCopy.forEach((child, index) => {
    if (child.hasOwnProperty('key') && !result.find(r => r.key === child.key)) {
      result.splice(index === 0 ? 0 : index + 1, 0, {
        ...child,
        willMount: true,
      });
    }

    previousIndex = index;
  });

  return result;
}

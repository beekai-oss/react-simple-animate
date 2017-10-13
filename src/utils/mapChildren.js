// @flow
import React from 'react';
import propsGenerator from './propsGenerator';
import type { Props, State } from '../animate';

let componentProps = null;

const filterUnMountChildren = (children: Array<React$Element<any>>) =>
  children.filter((child: Object) => !child.willUnmount);

export default function mapChildren(props: Props, state: State) {
  const { childrenStoreInState, animationWillLeave } = state;

  const tempChildren =
    Array.isArray(childrenStoreInState) && childrenStoreInState.length
      ? childrenStoreInState
      : props.children;

  const children =
    animationWillLeave && Array.isArray(childrenStoreInState)
      ? filterUnMountChildren(childrenStoreInState)
      : tempChildren;

  if (!Array.isArray(children)) return null;

  return children.map((child: Object) => {
    if (!child) return null;

    const { willMount = false, willUnmount = false } = child;

    componentProps = propsGenerator(
      {
        ...props,
      },
      state,
      {
        willUnmount,
        willMount,
      },
    );

    return React.cloneElement(child, {
      ...{ ...child.props },
      style: componentProps.style,
    });
  });
}

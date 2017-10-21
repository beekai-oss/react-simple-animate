// @flow
import React from 'react';
import propsGenerator from './propsGenerator';
import type { Props, State } from '../animate';

const filterUnMountChildren = (children: Array<React$Element<any>>) =>
  children.filter((child: Object) => !child.willUnmount);

export default function mapChildren(props: Props, state: State) {
  const { childrenStoreInState, willLeave, willEnter } = state;

  if (!Array.isArray(childrenStoreInState)) {
    return null;
  }

  const children = willLeave
    ? filterUnMountChildren(childrenStoreInState)
    : childrenStoreInState;

  return children.map((child: Object) => {
    if (!child) return null;

    let componentProps = {};
    let startAnimation = true;

    const { willMount = false, willUnmount = false } = child;
    const isAnimateComponent =
      child.type &&
      child.type.displayName &&
      child.type.displayName === 'ReactSimpleAnimate';

    if (isAnimateComponent) {
      if (willMount) {
        startAnimation = willEnter;
      } else if (willUnmount) {
        startAnimation = willLeave;
      }
    } else {
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
    }

    return React.cloneElement(child, {
      ...{ ...child.props },
      ...(!isAnimateComponent && componentProps.style
        ? { style: componentProps.style }
        : { startAnimation }),
    });
  });
}

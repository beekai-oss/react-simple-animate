// @flow
import React from 'react';
import propsGenerator from './propsGenerator';
import type { Props, State } from '../animate';

const filterUnMountChildren = (children: Array<React$Element<any>>) =>
  children.filter((child: Object) => !child.willUnmount);

export default function mapChildren(props: Props, state: State) {
  const { childrenStoreInState, willLeave, willEnter } = state;

  const tempChildren =
    Array.isArray(childrenStoreInState) && childrenStoreInState.length
      ? childrenStoreInState
      : props.children;

  const children =
    willLeave && Array.isArray(childrenStoreInState)
      ? filterUnMountChildren(childrenStoreInState)
      : tempChildren;

  if (!Array.isArray(children)) return null;

  return children.map((child: Object) => {
    if (!child) return null;

    const { willMount = false, willUnmount = false } = child;
    const isAnimateComponent =
      child.type &&
      child.type.displayName &&
      child.type.displayName === 'ReactSimpleAnimate';
    let componentProps = {};
    let startAnimation = true;

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

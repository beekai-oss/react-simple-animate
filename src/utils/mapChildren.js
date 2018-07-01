// @flow
import React from 'react';
import propsGenerator from './propsGenerator';
import type { Props, State } from '../animate';

const filterUnMountChildren = (children: Array<React$Element<any>>) =>
  children.filter((child: Object) => !child.willUnmount);

export default function mapChildren(props: Props, state: State): ?Array<?React.Component<*>> {
  const { childrenStoreInState, willLeave, willEnter } = state;
  const { durationSeconds, delaySeconds, reverseDelaySeconds, onComplete } = props;

  if (!Array.isArray(childrenStoreInState) || !Array.isArray(props.children)) {
    return null;
  }

  let children = childrenStoreInState;

  if (willLeave) {
    children = filterUnMountChildren(childrenStoreInState);
  } else if (willEnter) {
    children = props.children;
  }

  return children.map((child: Object) => {
    if (!child) return null;

    let componentProps = {};
    let startAnimation = true;

    const { willMount = false, willUnmount = false, props: childProps } = child;
    const isAnimateComponent = child.type && child.type.displayName && child.type.displayName === 'ReactSimpleAnimate';

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
      ...childProps,
      ...(!isAnimateComponent && componentProps.style
        ? { style: componentProps.style }
        : {
            startAnimation,
            durationSeconds,
            delaySeconds,
            reverseDelaySeconds,
            onComplete,
          }),
    });
  });
}

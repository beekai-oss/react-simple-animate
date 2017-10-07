// @flow
import React from 'react';
import propsGenerator from './propsGenerator';
import type { Props, State } from '../animate';

let componentProps = null;
let temp: Array<React$Element<any>> = [];

function filterUnMountChildren(children) {
  return children.filter((child: Object) => !child.willUnmount);
}

export default function mapChildren(props: Props, state: State) {
  const { tag } = props;
  const { childrenStoreInState, animationWillLeave } = state;

  if (!Array.isArray(childrenStoreInState)) return null;
  temp = childrenStoreInState;

  if (animationWillLeave) temp = filterUnMountChildren(childrenStoreInState);

  return temp.map((child: Object) => {
    const { willMount = false, willUnmount = false, key } = child;

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

    return React.createElement(tag || 'div', { ...componentProps, key }, child);
  });
}

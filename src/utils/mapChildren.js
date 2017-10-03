// @flow
import React from 'react';
import propsGenerator from './propsGenerator';

let componentProps = null;

function filterUnMountChildren(children) {
  return children.filter((child: any) => !child.willUnmount);
}

export default function mapChildren(
  children: Array<React$Element<any>>,
  tag?: string | null,
  withFilter?: boolean = false,
) {
  let temp = children;

  if (withFilter) temp = filterUnMountChildren(children);

  return temp.map((child: Object) => {
    const { willMount = false, willUnmount = false, key } = child;

    componentProps = propsGenerator(
      {
        ...this.props,
      },
      this.state,
      {
        willUnmount,
        willMount,
      },
    );

    return React.createElement(tag || 'div', { ...componentProps, key }, child);
  });
}

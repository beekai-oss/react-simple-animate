import React from 'react';
import renderer from 'react-test-renderer';
import AnimateGroup from '../src/animateGroup';

describe('AnimateGroup', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<AnimateGroup>Test</AnimateGroup>);
    expect(tree).toMatchSnapshot();
  });
});

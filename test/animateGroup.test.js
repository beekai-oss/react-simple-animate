import React from 'react';
import renderer from 'react-test-renderer';
import AnimateGroup from '../src/animateGroup';
import { shallow } from 'enzyme';

describe('AnimateGroup', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<AnimateGroup>Test</AnimateGroup>);
    expect(tree).toMatchSnapshot();
  });

  it('should register animation with id or index', () => {
    const tree = shallow(<AnimateGroup>Test</AnimateGroup>);
    tree.instance().register({});
  });
});

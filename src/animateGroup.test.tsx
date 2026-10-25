import { render, screen } from '@testing-library/react';
import * as React from 'react';
import AnimateGroup from './animateGroup';
import AnimateKeyframes from './animateKeyframes';
import { Animate } from './index';

describe('AnimateGroup', () => {
  it('should render correctly', () => {
    render(
      <AnimateGroup play>
        <Animate sequenceIndex={0} end={{ opacity: 0 }}>
          test
        </Animate>
        <AnimateKeyframes
          sequenceIndex={1}
          keyframes={['opacity: 0', 'opacity: 1']}
        >
          what
        </AnimateKeyframes>
      </AnimateGroup>,
    );

    expect(screen.getByText('test')).toHaveStyle({ opacity: '0' });
  });
});

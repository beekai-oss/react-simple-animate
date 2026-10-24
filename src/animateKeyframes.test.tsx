import { render, screen } from '@testing-library/react';
import * as React from 'react';
import AnimateKeyframes from './animateKeyframes';

vi.mock('./utils/createRandomName', () => ({
  default: () => 'test',
}));

describe('AnimateKeyframes', () => {
  it('should render set animation', () => {
    render(
      <AnimateKeyframes play keyframes={['opacity: 0', 'opacity: 1']}>
        bill
      </AnimateKeyframes>,
    );

    expect(screen.getByText('bill')).toHaveStyle({
      animation: '0.3s linear 0s 1 normal none running test',
    });
  });
});

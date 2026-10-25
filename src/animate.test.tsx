import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import Animate from '../src/animate';

describe('Animate', () => {
  it('should start with start style', () => {
    render(<Animate end={{ opacity: 0 }}>bill</Animate>);

    const element = screen.getByText('bill');
    expect(element).toHaveStyle({ transition: 'all 0.3s linear 0s' });
    expect(element.style.opacity).toBe('');
  });

  it('should use the configured transition property', () => {
    render(
      <Animate transitionProperty="opacity" end={{ opacity: 1 }}>
        configured transition
      </Animate>,
    );

    expect(screen.getByText('configured transition')).toHaveStyle({
      transition: 'opacity 0.3s linear 0s',
    });
  });

  it('should end with end style', () => {
    render(
      <Animate play start={{ opacity: 1 }} end={{ opacity: 0 }}>
        bill
      </Animate>,
    );

    expect(screen.getByText('bill')).toHaveStyle({ opacity: '0' });
  });

  it('should finish with complete style', () => {
    render(
      <Animate play end={{ opacity: 0 }} complete={{ background: 'red' }}>
        bill
      </Animate>,
    );

    const element = screen.getByText('bill');
    expect(element).toHaveStyle({ opacity: '0' });

    fireEvent.transitionEnd(element);
    expect(element).toHaveStyle({ background: 'red' });
  });

  it('should render correctly with render props', () => {
    render(
      <Animate
        play
        end={{ opacity: 0 }}
        render={({ style }) => <span style={style}>render props</span>}
      >
        bill
      </Animate>,
    );

    expect(screen.getByText('render props')).toHaveStyle({ opacity: '0' });
  });
});

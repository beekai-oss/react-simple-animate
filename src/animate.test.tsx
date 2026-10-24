import { act, render, screen } from '@testing-library/react';
import * as React from 'react';
import Animate from '../src/animate';

vi.useFakeTimers();

describe('Animate', () => {
  it('should start with start style', () => {
    render(<Animate end={{ opacity: 0 }}>bill</Animate>);

    const element = screen.getByText('bill');
    expect(element).toHaveStyle({ transition: 'all 0.3s linear 0s' });
    expect(element.style.opacity).toBe('');
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

    act(() => vi.runAllTimers());
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

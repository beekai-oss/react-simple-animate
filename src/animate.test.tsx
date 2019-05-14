import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Animate from '../src/animate';

jest.useFakeTimers();

describe('Animate', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should start with start style', () => {
    act(() => {
      ReactDOM.render(<Animate end={{ opacity: 0 }}>bill</Animate>, container);
    });

    const div = container.querySelector('div');
    expect(div.innerHTML).toEqual('bill');
    expect(div.style.transition).toEqual('all 0.3s linear 0s');
    expect(div.style.opacity).toBe('');
  });

  it('should end with end style', () => {
    act(() => {
      ReactDOM.render(
        <Animate play start={{ opacity: 1 }} end={{ opacity: 0 }}>
          bill
        </Animate>,
        container,
      );
    });

    const div = container.querySelector('div');
    expect(div.innerHTML).toEqual('bill');
    expect(div.style.opacity).toEqual('0');
  });

  it('should finish with complete style', () => {
    act(() => {
      ReactDOM.render(
        <Animate play end={{ opacity: 0 }} complete={{ background: 'red' }}>
          bill
        </Animate>,
        container,
      );
    });

    const div = container.querySelector('div');
    expect(div.style.opacity).toEqual('0');

    jest.runAllTimers();
    expect(div.style.background).toEqual('red');
  });

  it('should render correctly with render props', () => {
    act(() => {
      ReactDOM.render(
        // @ts-ignore
        <Animate play end={{ opacity: 0 }} render={({ style }) => <span style={style}>render props</span>}>
          bill
        </Animate>,
        container,
      );
    });

    const div = container.querySelector('span');
    expect(div.style.opacity).toEqual('0');
    expect(div.innerHTML).toEqual('render props');
  });
});

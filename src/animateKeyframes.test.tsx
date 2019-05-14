import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import AnimateKeyframes from './animateKeyframes';

jest.mock('./utils/createRandomName', () => ({
  default: () => 'test',
}));

describe('AnimateKeyframes', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should render set animation', () => {
    act(() => {
      ReactDOM.render(
        <AnimateKeyframes play keyframes={['opacity: 0', 'opacity: 1']}>
          bill
        </AnimateKeyframes>,
        container,
      );
    });

    const div = container.querySelector('div');
    expect(div.innerHTML).toEqual('bill');

    expect(div.style.animation).toEqual('0.3s linear 0s 1 normal none running test');
  });
});

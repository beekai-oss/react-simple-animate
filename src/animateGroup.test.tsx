import AnimateGroup from './animateGroup';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import * as React from 'react';
import { Animate } from './index';
import AnimateKeyframes from './animateKeyframes';

describe('AnimateGroup', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should render correctly', () => {
    act(() => {
      ReactDOM.render(
        <AnimateGroup play>
          <Animate sequenceIndex={0} end={{ opacity: 0 }}>
            test
          </Animate>
          <AnimateKeyframes sequenceIndex={1} keyframes={['opacity: 0', 'opacity: 1']}>
            what
          </AnimateKeyframes>
        </AnimateGroup>,
        container,
      );
    });

    act(() => {
      expect(container.querySelectorAll('div')[0].style.opacity).toEqual('0');
    });
  });
});

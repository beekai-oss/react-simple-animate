// @flow
import createStyle from './createStyle';
import createRandomName from '../utils/createRandomName';
import type { Keyframes } from '../animateKeyframes';

export default function createTag(keyframes: Keyframes) {
  const animationName = createRandomName();
  let styleTag = document.querySelector('style[data-id-rsi]');

  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.setAttribute('data-id', 'rsi');
    // $FlowIgnoreLine:
    document.head.appendChild(styleTag);
  }

  // $FlowIgnoreLine
  const index = styleTag?.sheet?.cssRules?.length || 0;

  try {
    this.styleTag.sheet.insertRule(
      createStyle({
        keyframes,
        animationName,
      }),
      index,
    );
  } catch (e) {
    console.error('react simple animate, error found during insert style:', e); // eslint-disable-line no-console
  }

  return {
    styleTag,
    index,
    animationName,
  };
}

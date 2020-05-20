import createStyle from './createStyle';
import { Keyframes } from '../types';

export default function createTag({
  keyframes,
  animationName,
}: {
  keyframes: Keyframes;
  animationName: string;
}): {
  styleTag: any;
  index: number;
} {
  let styleTag = document.querySelector('style[data-id=rsi]');
  let index;

  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.setAttribute('data-id', 'rsi');
    document.head.appendChild(styleTag);
  }

  try {
    // @ts-ignore
    index = styleTag.sheet.cssRules.length;
  } catch (e) {
    index = 0;
  }

  try {
    // @ts-ignore
    styleTag.sheet.insertRule(
      createStyle({
        keyframes,
        animationName,
      }),
      index,
    );
  } catch (e) {
    console.error('react simple animate, error found during insert style ', e); // eslint-disable-line no-console
  }

  return {
    styleTag,
    index,
  };
}

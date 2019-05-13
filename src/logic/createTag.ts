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

  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.setAttribute('data-id', 'rsi');
    // $FlowIgnoreLine:
    document.head.appendChild(styleTag);
  }

  // @ts-ignore
  const index = styleTag.sheet.cssRules.length || 0;

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

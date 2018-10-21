import createStyle from './createStyle';
import createRandomName from '../utils/createRandomName';

export default function createTag(keyframes) {
  const animationName = createRandomName();
  let styleTag = document.querySelector('style[data-id-rsi]');

  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.setAttribute('data-id', 'rsi');
    document.head.appendChild(styleTag);
  }

  const index = styleTag.sheet.cssRules.length;

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

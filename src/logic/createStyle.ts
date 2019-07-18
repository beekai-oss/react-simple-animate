import { Keyframes } from '../types';
import camelCaseToDash from '../utils/camelCaseToDash';

const generateKeyframes = keyframes => {
  const animationLength = keyframes.length;
  return keyframes.reduce((previous, keyframe, currentIndex) => {
    const keyframePersentage = animationLength === 2
      ? currentIndex * 100
      : parseFloat((100 / (animationLength - 1)).toFixed(2)) * currentIndex;
      // ['opacity: 0', 'opacity: 1']
      if (typeof keyframe === 'string') {
        return `${previous} ${keyframePersentage}% {${keyframe}}`;
      }
      const keys = Object.keys(keyframe);
      // [{opacity: 0}, {opacity: 1}]
      if (keys.length && isNaN(+keys[0])) {
        const keyframeContent = keys.reduce((acc, key) => `${acc} ${camelCaseToDash(key)}: ${keyframe[key]};`, '');
        return `${previous} ${keyframePersentage}% {${keyframeContent}}`;
      }
      // [{0: 'opacity: 0'}, {50: 'opacity: 0.5'}, {100: 'opacity: 1' }];
      return `${previous} ${Object.keys(keyframe)[0]}% {${Object.values(keyframe)[0]}}`;
    }, '');
};

export default function createStyle({
  keyframes,
  animationName,
}: {
  keyframes: Keyframes;
  animationName: string;
}): string {
  return `@keyframes ${animationName} {${generateKeyframes(keyframes)}}`;
};

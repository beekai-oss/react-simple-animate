import { Keyframes } from '../types';
import camelCaseToDash from '../utils/camelCaseToDash';

const generateKeyframes = keyframes => {
  const animationLength = keyframes.length;
  return keyframes.reduce((previous, keyframe, currentIndex) => {
    const keyframePercentage =
      animationLength === 2
        ? currentIndex * 100
        : parseFloat((100 / (animationLength - 1)).toFixed(2)) * currentIndex;

    if (typeof keyframe === 'string') {
      return `${previous} ${keyframePercentage}% {${keyframe}}`;
    }
    const keys = Object.keys(keyframe);

    if (keys.length && isNaN(+keys[0])) {
      const keyframeContent = keys.reduce(
        (acc, key) => `${acc} ${camelCaseToDash(key)}: ${keyframe[key]};`,
        '',
      );
      return `${previous} ${keyframePercentage}% {${keyframeContent}}`;
    }
    return `${previous} ${Object.keys(keyframe)[0]}% {${
      Object.values(keyframe)[0]
    }}`;
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
}

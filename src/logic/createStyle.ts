import { Keyframes } from '../types';

export default function createStyle({
  keyframes,
  animationName,
}: {
  keyframes: Keyframes;
  animationName: string;
}): string {
  const animationLength = keyframes.length;

  return `${keyframes.reduce((previous, keyframe, currentIndex): string => {
    if (keyframe) {
      return `${previous} ${
        animationLength === 2 ? currentIndex * 100 : parseFloat((100 / (animationLength - 1)).toFixed(2)) * currentIndex
      }% {${keyframe}}`;
    }

    return `${previous} ${Object.keys(keyframe)[0]}% {${Object.values(keyframe)[0]}}`;
  }, `@keyframes ${animationName} {`)}}`;
}

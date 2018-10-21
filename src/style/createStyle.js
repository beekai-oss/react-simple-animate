// @flow
import type { Keyframes } from '../animateKeyframes';

export default function createStyle({ keyframes, animationName }: { keyframes: Keyframes, animationName: string }) {
  const animationLength = keyframes.length;

  return `${keyframes.reduce(
    (previous, keyframe, currentIndex) => `${previous}
        ${
          animationLength === 2
            ? currentIndex * 100
            : parseFloat((100 / (animationLength - 1)).toFixed(2)) * currentIndex
        }% {${keyframe}}`,
    `@keyframes ${animationName} {`,
  )}}`;
}

export default function createStyle({ keyframes, animationName }) {
  const animationLength = keyframes.length;

  return `${keyframes.reduce((previous, keyframe, currentIndex) => {
    return `${previous}
        ${
          animationLength === 2 ? currentIndex * 100 : (100 / (animationLength - 1)).toFixed(2) * currentIndex
        }% {${keyframe}}`;
  }, `@keyframes ${animationName} {`)}}`;
}

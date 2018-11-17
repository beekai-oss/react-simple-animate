import { useState, useEffect } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './style/createTag';

export default function useAnimateKeyframes(props) {
  const {
    play: propPlay,
    durationSeconds,
    keyframes,
    easeType,
    delaySeconds,
    iterationCount,
    direction,
    fillMode,
    playState: stylePlayState,
  } = props;
  let animationName = '';
  let localStyleTag;
  let localIndex;

  const [{ playState }, setPlay] = useState(props);

  useEffect(() => {
    animationName = createRandomName();
    const { styleTag, index } = createTag({ animationName, keyframes });
    localStyleTag = styleTag;
    localIndex = index;

    return () => {
      localStyleTag.sheet.deleteRule(localIndex);
    };
  }, []);

  const style =
    propPlay || playState
      ? {
          animation: `${durationSeconds}s ${easeType} ${delaySeconds}s ${iterationCount} ${direction} ${fillMode} ${stylePlayState} ${animationName}`,
        }
      : null;

  return [style, setPlay];
}

import { useState, useEffect } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './style/createTag';

export default function useAnimateKeyframes(props) {
  const {
    durationSeconds = 0.3,
    delaySeconds = 0,
    easeType = 'linear',
    direction = 'normal',
    fillMode = 'none',
    iterationCount = 1,
    keyframes,
  } = props;
  let animationName = '';
  let localStyleTag;
  let localIndex;

  const [play, setPlay] = useState(props);

  useEffect(() => {
    animationName = createRandomName();
    const { styleTag, index } = createTag({ animationName, keyframes });
    localStyleTag = styleTag;
    localIndex = index;

    return () => {
      localStyleTag.sheet.deleteRule(localIndex);
    };
  }, []);

  const style = {
    animation: `${durationSeconds}s ${easeType} ${delaySeconds}s ${iterationCount} ${direction} ${fillMode} ${
      play ? 'running' : 'paused'
    } ${animationName}`,
  };

  console.log(style);

  return [
    {
      style,
      play,
    },
    setPlay,
  ];
}

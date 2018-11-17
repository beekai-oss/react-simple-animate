// @flow
import { useEffect } from 'react';
import createRandomName from './utils/createRandomName';
import createTag from './style/createTag';

export default function useAnimateGroup(props) {
  props.forEach({});
  const animationNames = [];
  const localStyleTags = [];
  const localIndexes = [];

  useEffect(() => {
    props.forEach(({ keyframes = false }) => {
      if (typeof keyframes === 'string') {
        const animationName = createRandomName();
        animationNames.push(animationName);
        const { styleTag, index } = createTag({ animationName, keyframes });
        localStyleTags.push(styleTag);
        localIndexes.push(index);
      }
    });

    return () => {
      localStyleTags.forEach((localStyleTag, i) => {
        localStyleTag.sheet.deleteRule(localIndexes[i]);
      });
    };
  }, []);
}

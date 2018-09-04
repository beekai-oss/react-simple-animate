// @flow
import type { Props } from '../animate';

export default (props: Props) => {
  const { animationStates, sequenceId, sequenceIndex } = props;
  const id = sequenceId || sequenceIndex;
  if (!id || !animationStates || !animationStates[id]) return props;

  const stateCopy = { ...animationStates[id] };
  return { ...stateCopy, ...props };
};

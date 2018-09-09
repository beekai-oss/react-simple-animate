// @flow
import type { Props } from '../animate';

export default (props: Props, id?: string | number) => {
  const { animationStates, ...restProps } = props;
  if (!id || !animationStates || !animationStates[id]) return props;
  const stateCopy = { ...animationStates[id] };
  return { ...stateCopy, ...restProps };
};

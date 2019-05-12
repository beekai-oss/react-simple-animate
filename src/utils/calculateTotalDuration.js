// @flow
import msToSec from './msToSec';

export default ({
  duration = 0,
  delay = 0,
}: {
  duration?: number,
  delay?: number,
}): number => {
  const time =
    parseFloat(duration) + parseFloat(delay);
  return msToSec(time);
};

import { DEFAULT_DURATION } from '../constants';

export default ({
  duration = DEFAULT_DURATION,
  delay = 0,
  overlay = 0,
}: {
  duration?: number;
  delay?: number;
  overlay?: number;
}): number => duration + delay - overlay || 0;

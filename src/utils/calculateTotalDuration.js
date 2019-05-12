// @flow
export default ({ duration = 0, delay = 0 }: { duration?: number, delay?: number }): number =>
  parseFloat(duration) + parseFloat(delay);

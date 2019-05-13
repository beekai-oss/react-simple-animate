// @flow
export default ({
  duration = 0.3,
  delay = 0,
  overlay = 0,
}: {
  duration?: number,
  delay?: number,
  overlay: ?number,
}): number => parseFloat(duration) + parseFloat(delay) - parseFloat(overlay) || 0;

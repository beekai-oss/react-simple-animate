// @flow
export default ({
  durationSeconds = 0,
  delaySeconds = 0,
  overlaySeconds = 0,
}: {
  durationSeconds?: number,
  delaySeconds?: number,
  overlaySeconds?: number,
}): number => {
  const duration = parseFloat(durationSeconds) + parseFloat(delaySeconds);
  const withEarlySeconds = duration - parseFloat(overlaySeconds);
  return withEarlySeconds * 1000;
};

// @flow
export default (
  {
    durationSeconds = 0,
    delaySeconds = 0,
    overlaySeconds = 0,
  }: { durationSeconds?: number, delaySeconds?: number, overlaySeconds?: number },
  previous: number = 0,
) => {
  const duration = parseFloat(durationSeconds) + parseFloat(delaySeconds);
  const withEarlySeconds = duration - parseFloat(overlaySeconds);
  const ms = withEarlySeconds * 1000;
  return ms + previous;
};

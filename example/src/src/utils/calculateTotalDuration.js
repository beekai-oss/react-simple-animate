// @flow
export default ({
  durationSeconds = 0,
  delaySeconds = 0,
  overlaySeconds = 0,
  reverseDurationSeconds = 0,
  play,
}: {
  durationSeconds?: number,
  delaySeconds?: number,
  overlaySeconds?: number,
  reverseDurationSeconds?: number,
  play: boolean,
}): number => {
  const duration =
    parseFloat(play ? durationSeconds : reverseDurationSeconds || durationSeconds) + parseFloat(delaySeconds);
  const withEarlySeconds = duration - parseFloat(overlaySeconds);
  return withEarlySeconds * 1000;
};

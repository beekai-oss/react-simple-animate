// @flow
export default (
  id: number | string,
  animations: Object,
  {
    durationSeconds = 0,
    delaySeconds = 0,
    overlaySeconds = 0,
  }: { durationSeconds?: number, delaySeconds?: number, overlaySeconds?: number },
  previous: number,
) => {
  const duration =
    parseFloat(animations[id].durationSeconds || durationSeconds) +
    parseFloat(animations[id].delaySeconds || delaySeconds);
  const withEarlySeconds = duration - parseFloat(overlaySeconds);
  const ms = withEarlySeconds * 1000;
  return ms + previous;
};

// @flow
export default (
  animations: Object,
  {
    durationSeconds,
    delaySeconds,
    overlaySeconds,
    id,
  }: { durationSeconds: string, delaySeconds: string, overlaySeconds: string, id: string },
  previous: number,
) => {
  const duration =
    parseFloat(animations[id].durationSeconds || durationSeconds || 0) +
    parseFloat(animations[id].delaySeconds || delaySeconds || 0);
  const withEarlySeconds = duration - parseFloat(overlaySeconds || 0);
  const ms = withEarlySeconds * 1000;
  return ms + previous;
};

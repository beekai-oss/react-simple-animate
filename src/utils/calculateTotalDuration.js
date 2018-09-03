// @flow
export default (
  animations: Object,
  {
    durationSeconds,
    delaySeconds,
    overlaySeconds,
    sequenceId,
  }: { durationSeconds: string, delaySeconds: string, overlaySeconds: string, sequenceId: string },
  previous: number,
) => {
  const duration =
    parseFloat(animations[sequenceId].durationSeconds || durationSeconds || 0) +
    parseFloat(animations[sequenceId].delaySeconds || delaySeconds || 0);
  const withEarlySeconds = duration - parseFloat(overlaySeconds || 0);
  const ms = withEarlySeconds * 1000;
  return ms + previous;
};

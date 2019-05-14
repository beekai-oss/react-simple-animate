export default function getSequenceId(
  sequenceIndex: number | undefined,
  sequenceId: string | number | undefined,
  defaultValue?: string | number,
) {
  if (sequenceId === undefined && sequenceIndex === undefined) return defaultValue || 0;

  if (sequenceIndex && sequenceIndex >= 0) return sequenceIndex;

  if (sequenceId) return sequenceId;

  return 0;
}

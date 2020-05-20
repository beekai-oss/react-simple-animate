import isUndefined from './isUndefined';

export default function getSequenceId(
  sequenceIndex: number | undefined,
  sequenceId: string | number | undefined,
  defaultValue?: string | number,
) {
  if (isUndefined(sequenceId) && isUndefined(sequenceIndex))
    return defaultValue || 0;

  if (sequenceIndex && sequenceIndex >= 0) return sequenceIndex;

  if (sequenceId) return sequenceId;

  return 0;
}

import isUndefined from './isUndefined';

export default function getSequenceId(
  sequenceIndex?: number,
  sequenceId?: string | number,
  defaultValue?: string | number,
): number | string {
  if (isUndefined(sequenceId) && isUndefined(sequenceIndex)) {
    return defaultValue || 0;
  }

  if (sequenceIndex && sequenceIndex >= 0) {
    return sequenceIndex;
  }

  if (sequenceId) {
    return sequenceId;
  }

  return 0;
}

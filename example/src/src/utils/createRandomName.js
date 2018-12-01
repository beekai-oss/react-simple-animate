// @flow

export default function createRandomName(): string {
  return `RSI-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}

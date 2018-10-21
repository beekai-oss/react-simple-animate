// @flow

export default function createRandomName() {
  return `RSI-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}

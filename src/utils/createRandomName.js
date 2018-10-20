// @flow

export default function createRandomName() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

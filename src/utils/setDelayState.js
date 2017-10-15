// @flow
export default function setDelayState(
  durationSeconds: number = 0,
  stateName: string,
  callback?: () => mixed,
): number {
  return setTimeout(() => {
    this.setState({
      [stateName]: true,
    });

    if (callback) callback();
  }, parseFloat(durationSeconds) * 1000);
}

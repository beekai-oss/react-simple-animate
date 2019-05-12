// @flow

export default (ms: ?number): number => (parseFloat(ms) || 0) * 1000;

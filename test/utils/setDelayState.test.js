import setDelayState from '../../src/utils/setDelayState';

jest.useFakeTimers();

describe('setDelayState', () => {
  it('should update state', function() {
    const setState = jest.fn();
    this.setState = setState;
    setDelayState.call(this, 2, 'test');
    jest.runAllTimers();
    expect(setState.mock.calls.length).toBe(1);
    expect(setState.mock.calls[0][0]).toEqual({ test: true });
  });

  it('should call the callback function if exists', function() {
    this.setState = () => {};
    const callback = jest.fn();
    setDelayState.call(this, 2, 'test', callback);
    jest.runAllTimers();
    expect(callback.mock.calls.length).toBe(1);
  });
});

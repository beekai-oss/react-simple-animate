import deleteRules from './deleteRules';

describe('deleteRules', () => {
  it('should do nothing when index not found', () => {
    const deleteRule = jest.fn();
    const data = {
      cssRules: {},
      deleteRule,
    } as any;
    deleteRules(data, 'whatever');
    expect(deleteRule).not.toBeCalled();
  });

  it('should delete the associated rule', () => {
    const deleteRule = jest.fn();
    const data = {
      deleteRule,
      cssRules: {
        name: {
          name: 'bill',
        },
      },
    } as any;
    deleteRules(data, 'bill');
    expect(deleteRule).toBeCalled();
  });
});

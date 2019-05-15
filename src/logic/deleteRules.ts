export default (sheet: any, deleteName: string): void => {
  const index = Object.values(sheet.cssRules).findIndex(({ name }: { name: string }): any => name === deleteName);
  if (index >= 0) sheet.deleteRule(index);
};

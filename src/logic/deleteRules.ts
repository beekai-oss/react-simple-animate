export default (sheet: CSSStyleSheet, deleteName: string): void => {
  const index = Object.values(sheet.cssRules).findIndex(({ name }: any): any => name === deleteName);
  if (index >= 0) sheet.deleteRule(index);
};

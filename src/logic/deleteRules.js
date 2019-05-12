// @flow

export default (sheet: CSSStyleSheet, deleteName: string) => {
  const index = Object.values(sheet.cssRules).findIndex(({ name }: any) => name === deleteName);
  if (index >= 0) {
    sheet.deleteRule(index);
  }
};

export default (
  sheet: CSSStyleSheet | null | undefined,
  deleteName: string,
): void => {
  if (!sheet) {
    return;
  }
  const index = Object.values(sheet.cssRules).findIndex(
    ({ name }: CSSKeyframesRule) => name === deleteName,
  );
  if (index >= 0) {
    sheet.deleteRule(index);
  }
};

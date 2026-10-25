export default (
  sheet: CSSStyleSheet | null | undefined,
  deleteName: string,
): void => {
  if (!sheet) {
    return;
  }
  const index = Object.values(sheet.cssRules).findIndex(
    (rule) => 'name' in rule && rule.name === deleteName,
  );
  if (index >= 0) {
    sheet.deleteRule(index);
  }
};

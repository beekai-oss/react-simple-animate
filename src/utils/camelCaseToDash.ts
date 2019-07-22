export default (camelCase?: string): string =>
  camelCase ? camelCase.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`) : '';

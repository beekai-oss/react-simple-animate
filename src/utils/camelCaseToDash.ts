export default (camelCase: string): string => camelCase.replace(/[A-Z]/g, '-$&').toLowerCase();

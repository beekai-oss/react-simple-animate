import camelCaseToDash from './camelCaseToDash';

export default (list: string[]): string => list.reduce((acc, curr) => `${acc}, ${camelCaseToDash(curr)} 0s`, '');

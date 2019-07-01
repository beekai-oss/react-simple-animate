import camelCaseToDash from './camelCaseToDash';

export default (list: string[]): string => list.reduce((acc, curr) => `, ${camelCaseToDash(curr)} 0s`, '');

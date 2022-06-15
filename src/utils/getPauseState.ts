import { PAUSED, RUNNING } from '../constants';

export default (pause: boolean): string => (pause ? PAUSED : RUNNING);

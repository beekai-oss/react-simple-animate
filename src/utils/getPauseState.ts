import { RUNNING } from '../constants';

export default (pause: boolean): string => (pause ? 'paused' : RUNNING);

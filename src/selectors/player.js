import { prop, propOr} from 'ramda';

export const getIsPlaying = prop('is_playing');

export const getNowPlayingItem = propOr({}, 'item');

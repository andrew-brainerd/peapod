import { compose, prop, propOr } from 'ramda';

export const getIsPlaying = prop('is_playing');

export const getTrackProgress = prop('progress_ms');

export const getNowPlayingItem = propOr({}, 'item');

export const getTrackLength = compose(prop('duration_ms'), getNowPlayingItem);

export const getNowPlayingAlbum = compose(propOr({}, 'album'), getNowPlayingItem);

export const getTrackImages = compose(propOr([], 'images'), getNowPlayingAlbum);

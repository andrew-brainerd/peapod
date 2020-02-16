import { compose, path, pathOr, prop } from 'ramda';

export const getAccessToken = path(['spotify', 'accessToken']);

export const getProfile = path(['spotify', 'profile']);

export const getProfileId = compose(prop('id'), getProfile);

export const getAlbums = pathOr([], ['spotify', 'albums', 'items']);

export const getIsLoadingTracks = path(['spotify', 'isLoadingTracks']);

export const getTracks = pathOr([], ['spotify', 'tracks', 'items']);

export const getDevices = pathOr([], ['spotify', 'devices']);

export const getNowPlaying = pathOr({}, ['spotify', 'nowPlaying']);

export const getIsLoadingNowPlaying = path(['spotify', 'isLoadingNowPlaying']);

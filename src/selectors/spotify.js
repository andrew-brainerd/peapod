import { path, pathOr } from 'ramda';

export const getAccessToken = path(['spotify', 'accessToken']);

export const getAlbums = pathOr([], ['spotify', 'albums', 'items']);

export const getIsLoadingTracks = path(['spotify', 'isLoadingTracks']);

export const getTracks = pathOr([], ['spotify', 'tracks', 'items']);

export const getNowPlaying = pathOr({}, ['spotify', 'nowPlaying']);

export const getIsLoadingNowPlaying = path(['spotify', 'isLoadingNowPlaying']);

import { path, pathOr } from 'ramda';

export const getAccessToken = () => path(['appConfig', 'spotify', 'accessToken'], window);

export const getAlbums = pathOr([], ['spotify', 'albums', 'items']);

export const getIsLoadingTracks = path(['spotify', 'isLoadingTracks']);

export const getTracks = pathOr([], ['spotify', 'tracks', 'items']);

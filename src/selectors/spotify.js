import { path, pathOr } from 'ramda';

export const getAccessToken = () => path(['appConfig', 'spotify', 'accessToken'], window);

export const getAlbums = pathOr([], ['spotify', 'albums', 'items']);

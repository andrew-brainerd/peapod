import * as spotify from '../api/spotify';
import { getAccessToken } from '../selectors/spotify';

const PREFIX = 'SPOTIFY';

export const LOADING_ALBUMS = `${PREFIX}/LOADING_ALBUMS`;
export const ALBUMS_LOADED = `${PREFIX}/ALBUMS_LOADED`;

const loadingAlbums = { type: LOADING_ALBUMS };

const albumsLoaded = albums => ({ type: ALBUMS_LOADED, albums });

export const getLogicAlbums = () => async (dispatch, getState) => {
  dispatch(loadingAlbums);
  const token = getAccessToken(getState());
  spotify.getLogicAlbums(token)
    .then(albums => dispatch(albumsLoaded(albums)))
    .catch(err => console.error('Failed to fetch user albums', err))
};

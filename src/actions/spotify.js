import * as spotify from '../api/spotify';
import { getAccessToken } from '../selectors/spotify';

const PREFIX = 'SPOTIFY';

export const LOADING_ALBUMS = `${PREFIX}/LOADING_ALBUMS`;
export const ALBUMS_LOADED = `${PREFIX}/ALBUMS_LOADED`;
export const LOADING_TRACKS = `${PREFIX}/LOADING_TRACKS`;
export const TRACKS_LOADED = `${PREFIX}/TRACKS_LOADED`;

const loadingAlbums = { type: LOADING_ALBUMS };
const albumsLoaded = albums => ({ type: ALBUMS_LOADED, albums });

const loadingTracks = { type: LOADING_TRACKS };
const tracksLoaded = tracks => ({ type: TRACKS_LOADED, tracks });

export const getLogicAlbums = () => async (dispatch, getState) => {
  dispatch(loadingAlbums);
  const token = getAccessToken(getState());
  spotify.getLogicAlbums(token)
    .then(albums => dispatch(albumsLoaded(albums)))
    .catch(err => console.error('Failed to fetch Logic albums', err));
};

export const getMyTopTracks = () => async (dispatch, getState) => {
  dispatch(loadingTracks);
  const token = getAccessToken(getState());
    spotify.getMyTopTracks(token)
      .then(tracks => dispatch(tracksLoaded(tracks)))
      .catch(err => console.error('Failed to fetch user tracks', err));
};

import * as spotify from '../api/spotify';
import {
  getLocalAccessToken,
  getLocalAuth,
  setLocalAuth,
  hasValidLocalAuth,
  calculateExpireTime
} from '../utils/spotify';
import { getAccessToken } from '../selectors/spotify';

const PREFIX = 'SPOTIFY';

export const SET_AUTH = `${PREFIX}/SET_AUTH`;
export const LOADING_ALBUMS = `${PREFIX}/LOADING_ALBUMS`;
export const ALBUMS_LOADED = `${PREFIX}/ALBUMS_LOADED`;
export const LOADING_TRACKS = `${PREFIX}/LOADING_TRACKS`;
export const TRACKS_LOADED = `${PREFIX}/TRACKS_LOADED`;

const loadingAlbums = { type: LOADING_ALBUMS };
const albumsLoaded = albums => ({ type: ALBUMS_LOADED, albums });

const loadingTracks = { type: LOADING_TRACKS };
const tracksLoaded = tracks => ({ type: TRACKS_LOADED, tracks });

export const setAuth = ({ accessToken, refreshToken, expireTime }) =>
  ({ type: SET_AUTH, accessToken, refreshToken, expireTime });

export const refreshAuth = ({ accessToken, refreshToken }) => async dispatch => {
  spotify.refreshAuth(accessToken, refreshToken).then(refreshData => {
    const auth = {
      accessToken: refreshData.access_token,
      expireTime: calculateExpireTime(refreshData.expires_in)
    };

    setLocalAuth(auth);
    dispatch(setAuth(auth));
  }
  );
};

export const loadLocalAuth = () => async dispatch => {
  if (getLocalAccessToken()) {
    hasValidLocalAuth() ?
      dispatch(setAuth(getLocalAuth())) :
      dispatch(refreshAuth(getLocalAuth()));
  }
};

export const getLogicAlbums = () => async (dispatch, getState) => {
  dispatch(loadingAlbums);
  spotify.getLogicAlbums(getAccessToken(getState()))
    .then(albums => dispatch(albumsLoaded(albums)))
    .catch(err => console.error('Failed to fetch Logic albums', err));
};

export const getMyTopTracks = () => async (dispatch, getState) => {
  dispatch(loadingTracks);
  spotify.getMyTopTracks(getAccessToken(getState()))
    .then(tracks => dispatch(tracksLoaded(tracks)))
    .catch(err => console.error('Failed to fetch user tracks', err));
};

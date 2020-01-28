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
export const LOADING_NOW_PLAYING = `${PREFIX}/LOADING_NOW_PLAYING`;
export const NOW_PLAYING_LOADED = `${PREFIX}/NOW_PLAYING_LOADED`;
export const LOADING_SEARCH_RESULTS = `${PREFIX}/LOADING_SEARCH_RESULTS`;
export const SEARCH_RESULTS_LOADED = `${PREFIX}/SEARCH_RESULTS_LOADED`;

const loadingAlbums = { type: LOADING_ALBUMS };
const albumsLoaded = albums => ({ type: ALBUMS_LOADED, albums });

const loadingTracks = { type: LOADING_TRACKS };
const tracksLoaded = tracks => ({ type: TRACKS_LOADED, tracks });

const loadingSearchResults = { type: LOADING_SEARCH_RESULTS };
const searchResultsLoaded = { type: SEARCH_RESULTS_LOADED };

const loadingNowPlaying = { type: LOADING_NOW_PLAYING };
const nowPlayingLoaded = nowPlaying => ({ type: NOW_PLAYING_LOADED, nowPlaying });

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

export const getMyTopTracks = () => async (dispatch, getState) => {
  dispatch(loadingTracks);
  spotify.getMyTopTracks(getAccessToken(getState()))
    .then(tracks => dispatch(tracksLoaded(tracks)))
    .catch(err => console.error('Failed to fetch user tracks', err));
};

export const search = searchText => async (dispatch, getState) => {
  const types = ['track'];
  dispatch(loadingSearchResults);
  if (searchText === '') {
    dispatch(getMyTopTracks());
  } else {
    spotify.search(getAccessToken(getState()), searchText, types).then(results => {
      dispatch(searchResultsLoaded);
      dispatch(tracksLoaded(results.tracks));
    });
  }
};

export const getMyNowPlaying = () => async (dispatch, getState) => {
  dispatch(loadingNowPlaying);
  spotify.getMyNowPlaying(getAccessToken(getState()))
    .then(nowPlaying => dispatch(nowPlayingLoaded(nowPlaying)))
    .catch(err => console.error('Failed to fetch user now playing', err));
};

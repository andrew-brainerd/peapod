import * as spotify from '../api/spotify';
import {
  getLocalAccessToken,
  getLocalAuth,
  setLocalAuth,
  hasValidLocalAuth,
  calculateExpireTime
} from '../utils/spotify';
import { getAccessToken } from '../selectors/spotify';
import { HOME_ROUTE } from '../constants/routes';
import { navTo } from './routing';
import { updateClients } from './sync';

const PREFIX = 'SPOTIFY';

export const SET_AUTH = `${PREFIX}/SET_AUTH`;
export const SIGN_OUT = `${PREFIX}/SIGN_OUT`;
export const LOADING_PROFILE = `${PREFIX}/LOADING_PROFILE`;
export const PROFILE_LOADED = `${PREFIX}/PROFILE_LOADED`;
export const LOADING_ARTISTS = `${PREFIX}/LOADING_ARTISTS`;
export const ARTISTS_LOADED = `${PREFIX}/ALBUMS_LOADED`;
export const LOADING_ALBUMS = `${PREFIX}/LOADING_ALBUMS`;
export const ALBUMS_LOADED = `${PREFIX}/ALBUMS_LOADED`;
export const LOADING_TRACKS = `${PREFIX}/LOADING_TRACKS`;
export const TRACKS_LOADED = `${PREFIX}/TRACKS_LOADED`;
export const LOADING_DEVICES = `${PREFIX}/LOADING_DEVICES`;
export const DEVICES_LOADED = `${PREFIX}/DEVICES_LOADED`;
export const PLAYING = `${PREFIX}/PLAYING`;
export const PAUSING = `${PREFIX}/PAUSING`;
export const TRANSFERRING_PLAYBACK = `${PREFIX}/TRANSFERRING_PLAYBACK`;
export const PLAYBACK_TRANSFERRED = `${PREFIX}/PLAYBACK_TRANSFERRED`;
export const LOADING_NOW_PLAYING = `${PREFIX}/LOADING_NOW_PLAYING`;
export const NOW_PLAYING_LOADED = `${PREFIX}/NOW_PLAYING_LOADED`;
export const LOADING_SEARCH_RESULTS = `${PREFIX}/LOADING_SEARCH_RESULTS`;
export const SEARCH_RESULTS_LOADED = `${PREFIX}/SEARCH_RESULTS_LOADED`;

const loadingProfile = { type: LOADING_PROFILE };
const profileLoaded = profile => ({ type: PROFILE_LOADED, profile });

// const loadingArtists = { type: LOADING_ALBUMS };
const artistsLoaded = artists => ({ type: ARTISTS_LOADED, artists });

// const loadingAlbums = { type: LOADING_ALBUMS };
const albumsLoaded = albums => ({ type: ALBUMS_LOADED, albums });

const loadingTracks = { type: LOADING_TRACKS };
const tracksLoaded = tracks => ({ type: TRACKS_LOADED, tracks });

const loadingDevices = { type: LOADING_DEVICES };
const devicesLoaded = devices => ({ type: DEVICES_LOADED, devices });

const tranferringPlayback = { type: TRANSFERRING_PLAYBACK };
const playbackTransferred = playback => ({ type: PLAYBACK_TRANSFERRED, playback });

const playing = { type: PLAYING };
const pausing = { type: PAUSING };

const loadingNowPlaying = { type: LOADING_NOW_PLAYING };
const nowPlayingLoaded = nowPlaying => ({ type: NOW_PLAYING_LOADED, nowPlaying });

const loadingSearchResults = { type: LOADING_SEARCH_RESULTS };
const searchResultsLoaded = { type: SEARCH_RESULTS_LOADED };

export const clearData = () => async dispatch => {
  window.localStorage.clear();
  dispatch(setAuth({
    accessToken: null,
    refreshToken: null,
    expireTime: null
  }));
  dispatch(profileLoaded(null));
  dispatch(artistsLoaded(null));
  dispatch(albumsLoaded(null));
  dispatch(tracksLoaded(null));
};

export const setAuth = ({ accessToken, refreshToken, expireTime }) =>
  ({ type: SET_AUTH, accessToken, refreshToken, expireTime });

export const signOut = () => async dispatch => {
  dispatch(clearData());
  dispatch(navTo(HOME_ROUTE));
};

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

export const getProfile = () => async (dispatch, getState) => {
  dispatch(loadingProfile);
  spotify.getProfile(getAccessToken(getState()))
    .then(profile => dispatch(profileLoaded(profile)))
    .catch(err => console.error('Failed to fetch user profile', err));
};

export const getMyTopTracks = () => async (dispatch, getState) => {
  dispatch(loadingTracks);
  spotify.getMyTopTracks(getAccessToken(getState()))
    .then(tracks => dispatch(tracksLoaded(tracks)))
    .catch(err => console.error('Failed to fetch user tracks', err));
};

export const getMyDevices = () => async (dispatch, getState) => {
  dispatch(loadingDevices);
  spotify.getMyDevices(getAccessToken(getState()))
    .then(devices => dispatch(devicesLoaded(devices)))
    .catch(err => console.error('Failed to fetch user devices', err));
};

export const getMyNowPlaying = () => async (dispatch, getState) => {
  dispatch(loadingNowPlaying);
  spotify.getMyNowPlaying(getAccessToken(getState()))
    .then(nowPlaying => {
      dispatch(nowPlayingLoaded(nowPlaying));
      dispatch(updateClients(nowPlaying));
    })
    .catch(err => console.error('Failed to fetch user now playing', err));
};

export const transferPlayback = (devices, shouldPlay) => async (dispatch, getState) => {
  dispatch(tranferringPlayback);
  spotify.transferPlayback(getAccessToken(getState()), devices, shouldPlay)
    .then(playback => {
      dispatch(playbackTransferred(playback));
      dispatch(getMyNowPlaying());
    })
    .catch(err => console.error('Failed to transfer playback', err));
};

export const play = options => async (dispatch, getState) => {
  dispatch(playing);
  spotify.play(getAccessToken(getState()), options)
    .then(() => setTimeout(() => dispatch(getMyNowPlaying()), 1000))
    .catch(err => console.error('Failed to play', err));
};

export const pause = () => async (dispatch, getState) => {
  dispatch(pausing);
  spotify.pause(getAccessToken(getState()))
    .then(() => setTimeout(() => dispatch(getMyNowPlaying()), 1000))
    .catch(err => console.error('Failed to pause', err));
};

export const search = searchText => async (dispatch, getState) => {
  const types = ['track'];
  dispatch(loadingSearchResults);
  if (searchText === '') {
    dispatch(getMyTopTracks());
  } else {
    spotify.search(getAccessToken(getState()), searchText, types).then(
      ({ artists, albums, tracks }) => {
        dispatch(searchResultsLoaded);
        artists && dispatch(artistsLoaded(artists));
        albums && dispatch(albumsLoaded(albums));
        tracks && dispatch(tracksLoaded(tracks));
      });
  }
};

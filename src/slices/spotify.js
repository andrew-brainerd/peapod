import { createSlice } from '@reduxjs/toolkit';
import * as spotifyApi from '../api/spotify';
import {
  getLocalAccessToken,
  getLocalAuth,
  setLocalAuth,
  hasValidLocalAuth,
  calculateExpireTime
} from '../utils/spotify';
import { updateClients } from './sync';

const spotifySlice = createSlice({
  name: 'spotify',
  initialState: {
    accessToken: null,
    refreshToken: null,
    expireTime: null,
    isLoadingDevices: false,
    isLoadingAlbums: false,
    isLoadingTracks: false,
    isLoadingNowPlaying: false,
    isLoadingProfile: false,
    isSearching: false,
    profile: null,
    devices: [],
    artists: [],
    albums: [],
    tracks: [],
    nowPlaying: {}
  },
  reducers: {
    setAuth (state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
      state.expireTime = action.payload.expireTime ?? state.expireTime;
    },
    setLoadingProfile (state, action) {
      state.isLoadingProfile = action.payload;
    },
    profileLoaded (state, action) {
      state.isLoadingProfile = false;
      state.profile = action.payload;
    },
    albumsLoaded (state, action) {
      state.isLoadingAlbums = false;
      state.albums = action.payload;
    },
    setLoadingTracks (state, action) {
      state.isLoadingTracks = action.payload;
    },
    tracksLoaded (state, action) {
      state.isLoadingTracks = false;
      state.tracks = action.payload;
    },
    setLoadingDevices (state, action) {
      state.isLoadingDevices = action.payload;
    },
    devicesLoaded (state, action) {
      state.isLoadingDevices = false;
      state.devices = action.payload;
    },
    setLoadingNowPlaying (state, action) {
      state.isLoadingNowPlaying = action.payload;
    },
    nowPlayingLoaded (state, action) {
      state.isLoadingNowPlaying = false;
      state.nowPlaying = action.payload;
    },
    setSearching (state, action) {
      state.isSearching = action.payload;
    },
    searchResultsLoaded (state) {
      state.isSearching = false;
    },
    userPlaylistsLoaded (state, action) {
      state.playlists = action.payload;
    }
  }
});

export const {
  setAuth,
  profileLoaded,
  albumsLoaded,
  tracksLoaded,
  devicesLoaded,
  nowPlayingLoaded,
  searchResultsLoaded,
  userPlaylistsLoaded
} = spotifySlice.actions;

// Selectors
export const getAccessToken = state => state.spotify?.accessToken;
export const getProfile = state => state.spotify?.profile;
export const getProfileId = state => state.spotify?.profile?.id;
export const getAlbums = state => state.spotify?.albums?.items ?? [];
export const getIsLoadingTracks = state => state.spotify?.isLoadingTracks;
export const getTracks = state => state.spotify?.tracks?.items ?? [];
export const getDevices = state => state.spotify?.devices ?? [];
export const getNowPlaying = state => state.spotify?.nowPlaying ?? {};
export const getIsLoadingNowPlaying = state => state.spotify?.isLoadingNowPlaying;

// Thunks
export const clearData = () => dispatch => {
  window.localStorage.clear();
  dispatch(setAuth({ accessToken: null, refreshToken: null, expireTime: null }));
  dispatch(profileLoaded(null));
  dispatch(albumsLoaded(null));
  dispatch(tracksLoaded(null));
};

export const signOut = () => dispatch => {
  dispatch(clearData());
};

export const refreshAuth = ({ accessToken, refreshToken }) => dispatch => {
  spotifyApi.refreshAuth(accessToken, refreshToken).then(refreshData => {
    const auth = {
      accessToken: refreshData.access_token,
      expireTime: calculateExpireTime(refreshData.expires_in)
    };
    setLocalAuth(auth);
    dispatch(setAuth(auth));
  });
};

export const loadLocalAuth = () => dispatch => {
  if (getLocalAccessToken()) {
    hasValidLocalAuth()
      ? dispatch(setAuth(getLocalAuth()))
      : dispatch(refreshAuth(getLocalAuth()));
  }
};

export const fetchProfile = () => (dispatch, getState) => {
  dispatch(spotifySlice.actions.setLoadingProfile(true));
  spotifyApi.getProfile(getAccessToken(getState()))
    .then(profile => dispatch(profileLoaded(profile)))
    .catch(err => console.error('Failed to fetch user profile', err));
};

export const getMyTopTracks = () => (dispatch, getState) => {
  dispatch(spotifySlice.actions.setLoadingTracks(true));
  spotifyApi.getMyTopTracks(getAccessToken(getState()))
    .then(tracks => dispatch(tracksLoaded(tracks)))
    .catch(err => console.error('Failed to fetch user tracks', err));
};

export const getMyDevices = () => (dispatch, getState) => {
  dispatch(spotifySlice.actions.setLoadingDevices(true));
  spotifyApi.getMyDevices(getAccessToken(getState()))
    .then(devices => dispatch(devicesLoaded(devices)))
    .catch(err => console.error('Failed to fetch user devices', err));
};

export const getMyNowPlaying = () => (dispatch, getState) => {
  dispatch(spotifySlice.actions.setLoadingNowPlaying(true));
  spotifyApi.getMyNowPlaying(getAccessToken(getState()))
    .then(nowPlaying => {
      dispatch(nowPlayingLoaded(nowPlaying));
      dispatch(updateClients(nowPlaying));
    })
    .catch(err => console.error('Failed to fetch user now playing', err));
};

export const transferPlayback = (devices, shouldPlay) => (dispatch, getState) => {
  spotifyApi.transferPlayback(getAccessToken(getState()), devices, shouldPlay)
    .then(() => dispatch(getMyNowPlaying()))
    .catch(err => console.error('Failed to transfer playback', err));
};

export const play = options => (dispatch, getState) => {
  spotifyApi.play(getAccessToken(getState()), options)
    .then(() => setTimeout(() => dispatch(getMyNowPlaying()), 1000))
    .catch(err => console.error('Failed to play', err));
};

export const pause = () => (dispatch, getState) => {
  spotifyApi.pause(getAccessToken(getState()))
    .then(() => setTimeout(() => dispatch(getMyNowPlaying()), 1000))
    .catch(err => console.error('Failed to pause', err));
};

export const search = searchText => (dispatch, getState) => {
  const types = ['track'];
  dispatch(spotifySlice.actions.setSearching(true));
  if (searchText === '') {
    dispatch(getMyTopTracks());
  } else {
    spotifyApi.search(getAccessToken(getState()), searchText, types).then(
      ({ artists, albums, tracks }) => {
        dispatch(searchResultsLoaded());
        artists && dispatch(albumsLoaded(artists));
        albums && dispatch(albumsLoaded(albums));
        tracks && dispatch(tracksLoaded(tracks));
      });
  }
};

export const getMyPlaylists = userId => (dispatch, getState) => {
  spotifyApi.getMyPlaylists(getAccessToken(getState()), userId).then(
    playlists => dispatch(userPlaylistsLoaded(playlists))
  );
};

export default spotifySlice.reducer;

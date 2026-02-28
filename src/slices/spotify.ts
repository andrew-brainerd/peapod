import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import * as spotifyApi from '../api/spotify';
import {
  getLocalAccessToken,
  getLocalAuth,
  setLocalAuth,
  hasValidLocalAuth,
  calculateExpireTime
} from '../utils/spotify';
import { updateClients } from './sync';
import type { AppDispatch, RootState } from '../store/configureStore';
import type { SpotifyProfile, SpotifyDevice, NowPlaying, SpotifyAuth } from '../types';

interface SpotifyState {
  accessToken: string | null;
  refreshToken: string | null;
  expireTime: string | null;
  isLoadingDevices: boolean;
  isLoadingAlbums: boolean;
  isLoadingTracks: boolean;
  isLoadingNowPlaying: boolean;
  isLoadingProfile: boolean;
  isSearching: boolean;
  profile: SpotifyProfile | null;
  devices: SpotifyDevice[];
  artists: unknown[];
  albums: unknown[];
  tracks: unknown[];
  nowPlaying: NowPlaying;
  playlists?: unknown;
}

const initialState: SpotifyState = {
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
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setAuth (state, action: PayloadAction<SpotifyAuth>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
      state.expireTime = action.payload.expireTime ?? state.expireTime;
    },
    setLoadingProfile (state, action: PayloadAction<boolean>) {
      state.isLoadingProfile = action.payload;
    },
    profileLoaded (state, action: PayloadAction<SpotifyProfile | null>) {
      state.isLoadingProfile = false;
      state.profile = action.payload;
    },
    albumsLoaded (state, action) {
      state.isLoadingAlbums = false;
      state.albums = action.payload;
    },
    setLoadingTracks (state, action: PayloadAction<boolean>) {
      state.isLoadingTracks = action.payload;
    },
    tracksLoaded (state, action) {
      state.isLoadingTracks = false;
      state.tracks = action.payload;
    },
    setLoadingDevices (state, action: PayloadAction<boolean>) {
      state.isLoadingDevices = action.payload;
    },
    devicesLoaded (state, action: PayloadAction<SpotifyDevice[]>) {
      state.isLoadingDevices = false;
      state.devices = action.payload;
    },
    setLoadingNowPlaying (state, action: PayloadAction<boolean>) {
      state.isLoadingNowPlaying = action.payload;
    },
    nowPlayingLoaded (state, action: PayloadAction<NowPlaying>) {
      state.isLoadingNowPlaying = false;
      state.nowPlaying = action.payload;
    },
    setSearching (state, action: PayloadAction<boolean>) {
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
export const getAccessToken = (state: RootState) => state.spotify.accessToken;
export const getProfile = (state: RootState) => state.spotify.profile;
export const getProfileId = (state: RootState) => state.spotify.profile?.id;
export const getAlbums = (state: RootState): unknown[] => state.spotify.albums;
export const getIsLoadingTracks = (state: RootState) => state.spotify.isLoadingTracks;
export const getTracks = (state: RootState) => state.spotify.tracks;
export const getDevices = (state: RootState) => state.spotify.devices;
export const getNowPlaying = (state: RootState): NowPlaying => state.spotify.nowPlaying;
export const getIsLoadingNowPlaying = (state: RootState) => state.spotify.isLoadingNowPlaying;

// Thunks
export const clearData = () => (dispatch: AppDispatch) => {
  window.localStorage.clear();
  dispatch(setAuth({ accessToken: null, refreshToken: null, expireTime: undefined }));
  dispatch(profileLoaded(null));
  dispatch(albumsLoaded(null));
  dispatch(tracksLoaded(null));
};

export const signOut = () => (dispatch: AppDispatch) => {
  dispatch(clearData());
};

export const refreshAuth = ({ accessToken, refreshToken }: SpotifyAuth) => (dispatch: AppDispatch) => {
  spotifyApi.refreshAuth(accessToken, refreshToken ?? null).then(refreshData => {
    const auth: SpotifyAuth = {
      accessToken: refreshData.access_token,
      expireTime: calculateExpireTime(refreshData.expires_in)
    };
    setLocalAuth(auth);
    dispatch(setAuth(auth));
  });
};

export const loadLocalAuth = () => (dispatch: AppDispatch) => {
  if (getLocalAccessToken()) {
    hasValidLocalAuth()
      ? dispatch(setAuth(getLocalAuth()))
      : dispatch(refreshAuth(getLocalAuth()));
  }
};

export const fetchProfile = () => (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(spotifySlice.actions.setLoadingProfile(true));
  spotifyApi.getProfile(getAccessToken(getState()))
    .then(profile => dispatch(profileLoaded(profile)))
    .catch(err => console.error('Failed to fetch user profile', err));
};

export const getMyTopTracks = () => (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(spotifySlice.actions.setLoadingTracks(true));
  spotifyApi.getMyTopTracks(getAccessToken(getState()))
    .then(tracks => dispatch(tracksLoaded(tracks)))
    .catch(err => console.error('Failed to fetch user tracks', err));
};

export const getMyDevices = () => (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(spotifySlice.actions.setLoadingDevices(true));
  spotifyApi.getMyDevices(getAccessToken(getState()))
    .then(devices => dispatch(devicesLoaded(devices)))
    .catch(err => console.error('Failed to fetch user devices', err));
};

export const getMyNowPlaying = () => (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(spotifySlice.actions.setLoadingNowPlaying(true));
  spotifyApi.getMyNowPlaying(getAccessToken(getState()))
    .then(nowPlaying => {
      dispatch(nowPlayingLoaded(nowPlaying));
      dispatch(updateClients(nowPlaying));
    })
    .catch(err => console.error('Failed to fetch user now playing', err));
};

export const transferPlayback = (devices: string[], shouldPlay?: boolean) => (dispatch: AppDispatch, getState: () => RootState) => {
  spotifyApi.transferPlayback(getAccessToken(getState()), devices, shouldPlay)
    .then(() => dispatch(getMyNowPlaying()))
    .catch(err => console.error('Failed to transfer playback', err));
};

export const play = (options?: { uris?: string[] }) => (dispatch: AppDispatch, getState: () => RootState) => {
  spotifyApi.play(getAccessToken(getState()), options)
    .then(() => setTimeout(() => dispatch(getMyNowPlaying()), 1000))
    .catch(err => console.error('Failed to play', err));
};

export const pause = () => (dispatch: AppDispatch, getState: () => RootState) => {
  spotifyApi.pause(getAccessToken(getState()))
    .then(() => setTimeout(() => dispatch(getMyNowPlaying()), 1000))
    .catch(err => console.error('Failed to pause', err));
};

export const search = (searchText: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  const types = ['track'];
  dispatch(spotifySlice.actions.setSearching(true));
  if (searchText === '') {
    dispatch(getMyTopTracks());
  } else {
    spotifyApi.search(getAccessToken(getState()), searchText, types).then(
      ({ artists, albums, tracks }: { artists?: unknown; albums?: unknown; tracks?: unknown }) => {
        dispatch(searchResultsLoaded());
        artists && dispatch(albumsLoaded(artists));
        albums && dispatch(albumsLoaded(albums));
        tracks && dispatch(tracksLoaded(tracks));
      });
  }
};

export const getMyPlaylists = (userId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  spotifyApi.getMyPlaylists(getAccessToken(getState()), userId).then(
    playlists => dispatch(userPlaylistsLoaded(playlists))
  );
};

export default spotifySlice.reducer;

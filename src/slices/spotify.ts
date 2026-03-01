import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import * as spotifyApi from '../api/spotify';
import {
  getLocalAccessToken,
  getLocalAuth,
  setLocalAuth,
  hasValidLocalAuth,
  calculateExpireTime
} from '../utils/spotify';
import type { AppDispatch } from '../store/configureStore';
import type { SpotifyAuth } from '../types';

interface SpotifyState {
  accessToken: string | null;
  refreshToken: string | null;
  expireTime: string | null;
}

const initialState: SpotifyState = {
  accessToken: null,
  refreshToken: null,
  expireTime: null
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setAuth (state, action: PayloadAction<SpotifyAuth>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
      state.expireTime = action.payload.expireTime ?? state.expireTime;
    }
  }
});

export const { setAuth } = spotifySlice.actions;

// Selectors
export const getAccessToken = (state: { spotify: SpotifyState }) => state.spotify.accessToken;

// Thunks
export const clearData = () => (dispatch: AppDispatch) => {
  window.localStorage.clear();
  dispatch(setAuth({ accessToken: null, refreshToken: null, expireTime: undefined }));
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

export default spotifySlice.reducer;

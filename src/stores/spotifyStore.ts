import { create } from 'zustand';
import * as spotifyApi from '../api/spotify';
import {
  getLocalAccessToken,
  getLocalAuth,
  setLocalAuth,
  hasValidLocalAuth,
  calculateExpireTime
} from '../utils/spotify';
import type { SpotifyAuth } from '../types';

interface SpotifyState {
  accessToken: string | null;
  refreshToken: string | null;
  expireTime: string | null;
  setAuth: (auth: SpotifyAuth) => void;
  signOut: () => void;
  refreshAuth: (auth: SpotifyAuth) => void;
  loadLocalAuth: () => void;
}

export const useSpotifyStore = create<SpotifyState>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  expireTime: null,

  setAuth: (auth) => {
    set((state) => ({
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken ?? state.refreshToken,
      expireTime: auth.expireTime ?? state.expireTime
    }));
  },

  signOut: () => {
    window.localStorage.clear();
    set({ accessToken: null, refreshToken: null, expireTime: null });
  },

  refreshAuth: (auth) => {
    spotifyApi.refreshAuth(auth.accessToken, auth.refreshToken ?? null).then((refreshData) => {
      const newAuth: SpotifyAuth = {
        accessToken: refreshData.access_token,
        expireTime: calculateExpireTime(refreshData.expires_in)
      };
      setLocalAuth(newAuth);
      get().setAuth(newAuth);
    });
  },

  loadLocalAuth: () => {
    if (getLocalAccessToken()) {
      const localAuth = getLocalAuth();
      if (hasValidLocalAuth()) {
        get().setAuth(localAuth);
      } else {
        get().refreshAuth(localAuth);
      }
    }
  }
}));

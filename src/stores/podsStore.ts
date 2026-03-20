import { create } from 'zustand';
import * as podsApi from '../api/pods';
import { queryClient } from '../queryClient';
import { spotifyKeys } from '../queries/keys';
import type { Pod, SpotifyProfile } from '../types';

interface PodsState {
  isConnected: boolean;
  isConnecting: boolean;
  currentPod: Pod | null;
  connectToPod: (podId: string) => void;
  disconnectFromPod: (podId: string | undefined) => void;
}

const getProfileFromCache = (): SpotifyProfile | null =>
  queryClient.getQueryData(spotifyKeys.profile()) ?? null;

export const usePodsStore = create<PodsState>((set) => ({
  isConnected: false,
  isConnecting: false,
  currentPod: null,

  connectToPod: (podId) => {
    set({ isConnecting: true, isConnected: false, currentPod: { _id: podId } as Pod });
    const user = getProfileFromCache();
    if (!user) return;
    podsApi.addActiveMemberToPod(podId, user).then(() => {
      set({ isConnecting: false, isConnected: true });
    });
  },

  disconnectFromPod: (podId) => {
    set({ isConnecting: false });
    const user = getProfileFromCache();
    if (!user) return;
    podsApi.removeActiveMemberFromPod(podId!, user).then(() => {
      set({ isConnected: false });
    });
  }
}));

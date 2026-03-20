import { create } from 'zustand';
import { getChannel } from '../utils/pusher';
import { NOW_PLAYING } from '../constants/pods';
import { usePodsStore } from './podsStore';
import { queryClient } from '../queryClient';
import { spotifyKeys } from '../queries/keys';
import * as syncApi from '../api/sync';
import type { NowPlaying } from '../types';

interface SyncState {
  isSyncing: boolean;
  connectToPusher: (channelId: string, type: string, action: (...args: unknown[]) => void) => void;
  triggerUpdate: () => void;
  connectClient: (podId: string) => void;
  updateClients: (nowPlaying?: NowPlaying) => void;
}

export const useSyncStore = create<SyncState>((set) => ({
  isSyncing: false,

  connectToPusher: (channelId, type, action) => {
    console.log('%cConnecting to Pusher channel%o', 'color: cyan', { channelId, type, action });
    getChannel(channelId).bind(type, action);
  },

  triggerUpdate: () => {
    queryClient.invalidateQueries({ queryKey: ['pods', 'detail'] });
  },

  connectClient: (podId) => {
    usePodsStore.getState().connectToPod(podId);
    const { connectToPusher } = useSyncStore.getState();
    connectToPusher(podId, NOW_PLAYING, (track: unknown) => {
      queryClient.setQueryData(spotifyKeys.nowPlaying(), track as NowPlaying);
    });
    set({ isSyncing: true });
  },

  updateClients: (nowPlaying = {}) => {
    const podId = usePodsStore.getState().currentPod?._id;
    syncApi.pushNowPlayingToClients(podId, nowPlaying);
  }
}));

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getChannel } from '../utils/pusher';
import { NOW_PLAYING } from '../constants/pods';
import { connectToPod } from './pods';
import { queryClient } from '../queryClient';
import { spotifyKeys } from '../queries/keys';
import * as syncApi from '../api/sync';
import type { AppDispatch, RootState } from '../store/configureStore';
import type { NowPlaying } from '../types';

const syncSlice = createSlice({
  name: 'sync',
  initialState: {
    isSyncing: false
  },
  reducers: {
    setSyncing(state, action: PayloadAction<boolean>) {
      state.isSyncing = action.payload;
    }
  }
});

export const { setSyncing } = syncSlice.actions;

// Selectors
export const getIsSyncing = (state: RootState) => state.sync.isSyncing;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const connectToPusher = (channelId: string, type: string, action: (...args: any[]) => void) => () => {
  console.log('%cConnecting to Pusher channel%o', 'color: cyan', { channelId, type, action });
  getChannel(channelId).bind(type, action);
};

export const triggerUpdate = () => {
  // When a member is added, invalidate the pod detail query
  queryClient.invalidateQueries({ queryKey: ['pods', 'detail'] });
};

export const connectClient = (podId: string) => (dispatch: AppDispatch) => {
  dispatch(connectToPod(podId));
  dispatch(
    connectToPusher(podId, NOW_PLAYING, (track: NowPlaying) => {
      queryClient.setQueryData(spotifyKeys.nowPlaying(), track);
    })
  );
  dispatch(setSyncing(true));
};

export const updateClients =
  (nowPlaying: NowPlaying = {}) =>
  (_dispatch: AppDispatch, getState: () => RootState) => {
    const podId = getState().pods?.currentPod?._id;
    syncApi.pushNowPlayingToClients(podId, nowPlaying);
  };

export default syncSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import * as syncApi from '../api/sync';
import { getChannel } from '../utils/pusher';
import { NOW_PLAYING } from '../constants/pods';
import { connectToPod } from './pods';
import { nowPlayingLoaded } from './spotify';

const syncSlice = createSlice({
  name: 'sync',
  initialState: {
    isSyncing: false
  },
  reducers: {
    setSyncing (state, action) {
      state.isSyncing = action.payload;
    }
  }
});

export const { setSyncing } = syncSlice.actions;

// Selectors
export const getIsSyncing = state => state.sync?.isSyncing;

export const connectToPusher = (channelId, type, action) => () => {
  console.log('%cConnecting to Pusher channel%o', 'color: cyan', { channelId, type, action });
  getChannel(channelId).bind(type, action);
};

export const connectClient = podId => dispatch => {
  dispatch(connectToPod(podId));
  dispatch(connectToPusher(podId, NOW_PLAYING, track => {
    dispatch(nowPlayingLoaded(track));
  }));
  dispatch(setSyncing(true));
};

export const updateClients = (nowPlaying = {}) => (dispatch, getState) => {
  const podId = getState().pods?.currentPod?._id;
  syncApi.pushNowPlayingToClients(podId, nowPlaying);
};

export default syncSlice.reducer;

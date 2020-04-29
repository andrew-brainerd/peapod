import * as sync from '../api/sync';
import { getChannel } from '../utils/pusher';
import { NOW_PLAYING } from '../constants/pods';
import { getCurrentPodId } from '../selectors/pods';
import { connectToPod } from '../actions/pods';
import { nowPlayingLoaded } from '../actions/spotify';

const PREFIX = 'SYNC';

export const CONNECTING_CLIENT = `${PREFIX}/CONNECTING_CLIENT`;
export const CLIENT_CONNECTED = `${PREFIX}/CLIENT_CONNECTED`;
export const UPDATING_CLIENTS = `${PREFIX}/UPDATING_CLIENTS`;
export const SET_SYNCING = `${PREFIX}/SET_SYNCING`;

export const connectingClient = { type: CONNECTING_CLIENT };
export const clientConnected = { type: CLIENT_CONNECTED };
export const setSyncing = isSyncing => ({ type: SET_SYNCING, isSyncing });

export const connectToPusher = (channelId, type, action) => async dispatch => {
  console.log('%cConnecting to Pusher channel...', 'color: cyan');
  getChannel(channelId).bind(type, action);
};

export const connectClient = podId => async (dispatch, getState) => {
  dispatch(connectToPod(podId));
  dispatch(connectToPusher(podId, NOW_PLAYING, track => {
    dispatch(nowPlayingLoaded(track));
  }));
  dispatch(setSyncing(true));
};

export const updateClients = (nowPlaying = {}) => async (dispatch, getState) => {
  dispatch({ type: UPDATING_CLIENTS });
  const podId = getCurrentPodId(getState());
  sync.pushNowPlayingToClients(podId, nowPlaying);
};

import * as sync from '../api/sync';
import { getChannel } from '../utils/pusher';
import { NOW_PLAYING } from '../constants/pods';
import { getCurrentPodId } from '../selectors/pods';
import { connectToPod } from '../actions/pods';
import { nowPlayingLoaded } from '../actions/spotify';

const PREFIX = 'SYNC';

export const CONNECTING_CLIENT = `${PREFIX}/CONNECTING_CLIENT`;
export const UPDATING_CLIENTS = `${PREFIX}/UPDATING_CLIENTS`;
export const SET_SYNCING = `${PREFIX}/SET_SYNCING`;

export const connectingClient = { type: CONNECTING_CLIENT };
export const setSyncing = isSyncing => ({ type: SET_SYNCING, isSyncing });

export const connectToUpdates = channelId => async dispatch => {
  console.log('%cConnecting to Pusher channel...', 'color: cyan');
  getChannel(channelId).bind(NOW_PLAYING, track => {
    console.log('%cNow Playing: %o', 'color: orange', track.item.name);
    dispatch(nowPlayingLoaded(track));
  });
  dispatch(setSyncing(true));
};

export const connectClient = podId => async dispatch => {
  dispatch(connectToPod(podId));
  dispatch(connectToUpdates(podId));
};

export const updateClients = (nowPlaying = {}) => async (dispatch, getState) => {
  dispatch({ type: UPDATING_CLIENTS });
  const podId = getCurrentPodId(getState());
  sync.pushNowPlayingToClients(podId, nowPlaying);
};

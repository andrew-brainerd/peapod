import * as sync from '../api/sync';
import { getChannel } from '../utils/pusher';
import { NOW_PLAYING } from '../constants/pods';
import { getCurrentPodId } from '../selectors/pods';
import { nowPlayingLoaded } from '../actions/spotify';

const PREFIX = 'SYNC';

export const UPDATING_CLIENTS = `${PREFIX}/UPDATING_CLIENTS`;
export const SET_CONNECTING = `${PREFIX}/SET_CONNECTING`;
export const SET_SYNCING = `${PREFIX}/SET_SYNCING`;

export const setConnecting = isConnecting => ({ type: SET_CONNECTING, isConnecting });
export const setSyncing = isSyncing => ({ type: SET_SYNCING, isSyncing });

export const connectClient = channelId => async dispatch => {
  console.log('%cConnecting to Pusher channel...', 'color: cyan');
  dispatch(setConnecting(true));
  getChannel(channelId).bind(NOW_PLAYING, track => {
    console.log('%cNow Playing: %o', 'color: orange', track.item.name);
    dispatch(nowPlayingLoaded(track));
  });
  dispatch(setSyncing(true));
};

export const updateClients = (nowPlaying = {}) => async (dispatch, getState) => {
  dispatch({ type: UPDATING_CLIENTS });
  const podId = getCurrentPodId(getState());
  sync.pushNowPlayingToClients(podId, nowPlaying);
};

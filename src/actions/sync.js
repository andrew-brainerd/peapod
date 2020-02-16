import * as sync from '../api/sync';
import { getCurrentPodId } from '../selectors/pods';

const PREFIX = 'SYNC';

export const UPDATING_CLIENTS = `${PREFIX}/UPDATING_CLIENTS`;

export const updateClients = (nowPlaying = {}) => async (dispatch, getState) => {
  dispatch({ type: UPDATING_CLIENTS });
  const podId = getCurrentPodId(getState());
  sync.pushNowPlayingToClients(podId, nowPlaying);
};

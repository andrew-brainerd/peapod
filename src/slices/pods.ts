import { createSlice } from '@reduxjs/toolkit';
import * as podsApi from '../api/pods';
import { queryClient } from '../queryClient';
import { spotifyKeys } from '../queries/keys';
import type { AppDispatch } from '../store/configureStore';
import type { Pod, SpotifyProfile } from '../types';

interface PodsState {
  isConnected: boolean;
  isConnecting: boolean;
  currentPod: Pod | null;
}

const initialState: PodsState = {
  isConnected: false,
  isConnecting: false,
  currentPod: null
};

const podsSlice = createSlice({
  name: 'pods',
  initialState,
  reducers: {
    connectingClient (state) {
      state.isConnecting = true;
      state.isConnected = false;
    },
    clientConnected (state) {
      state.isConnecting = false;
      state.isConnected = true;
    },
    disconnectingClient (state) {
      state.isConnecting = false;
    },
    clientDisconnected (state) {
      state.isConnected = false;
    },
    setCurrentPodId (state, action) {
      state.currentPod = action.payload ? { _id: action.payload } as Pod : null;
    }
  }
});

// Selectors
export const getIsConnectingToPod = (state: { pods: PodsState }) => state.pods.isConnecting;
export const getIsConnectedToPod = (state: { pods: PodsState }) => state.pods.isConnected;

const getProfileFromCache = (): SpotifyProfile | null =>
  queryClient.getQueryData(spotifyKeys.profile()) ?? null;

// Thunks
export const connectToPod = (podId: string) => (dispatch: AppDispatch) => {
  dispatch(podsSlice.actions.connectingClient());
  dispatch(podsSlice.actions.setCurrentPodId(podId));
  const user = getProfileFromCache();
  if (!user) return;
  podsApi.addActiveMemberToPod(podId, user).then(() =>
    dispatch(podsSlice.actions.clientConnected())
  );
};

export const disconnectFromPod = (podId: string | undefined) => (dispatch: AppDispatch) => {
  dispatch(podsSlice.actions.disconnectingClient());
  const user = getProfileFromCache();
  if (!user) return;
  podsApi.removeActiveMemberFromPod(podId!, user).then(() =>
    dispatch(podsSlice.actions.clientDisconnected())
  );
};

export default podsSlice.reducer;

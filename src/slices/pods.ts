import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import * as podsApi from '../api/pods';
import { getProfile } from './spotify';
import type { AppDispatch, RootState } from '../store/configureStore';
import type { Pod, SpotifyTrack } from '../types';

interface PodsState {
  isCreatingPod: boolean;
  isLoadingPods: boolean;
  isLoadingPod: boolean;
  isAddingMember: boolean;
  isRemovingMember: boolean;
  isInviteModalOpen: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  items: Pod[];
  currentPod: Pod | null;
  createdPod: Pod | null;
  hasUpdates: boolean;
}

const initialState: PodsState = {
  isCreatingPod: false,
  isLoadingPods: false,
  isLoadingPod: false,
  isAddingMember: false,
  isRemovingMember: false,
  isInviteModalOpen: false,
  isConnected: false,
  isConnecting: false,
  items: [],
  currentPod: null,
  createdPod: null,
  hasUpdates: false
};

const podsSlice = createSlice({
  name: 'pods',
  initialState,
  reducers: {
    creatingPod (state) {
      state.isCreatingPod = true;
    },
    podCreated (state, action: PayloadAction<Pod>) {
      state.isCreatingPod = false;
      state.createdPod = action.payload;
    },
    loadingPods (state) {
      state.isLoadingPods = true;
      state.items = [];
    },
    podsLoaded (state, action) {
      state.isLoadingPods = false;
      Object.assign(state, action.payload);
    },
    loadingPod (state) {
      state.isLoadingPod = true;
    },
    podLoaded (state, action: PayloadAction<Pod>) {
      state.isLoadingPod = false;
      state.currentPod = action.payload;
      state.hasUpdates = false;
    },
    openInviteModal (state) {
      state.isInviteModalOpen = true;
    },
    closeInviteModal (state) {
      state.isInviteModalOpen = false;
    },
    addingMember (state) {
      state.isAddingMember = true;
    },
    addedMember (state) {
      state.isAddingMember = false;
    },
    removingMember (state) {
      state.isRemovingMember = true;
    },
    removedMember (state) {
      state.isRemovingMember = false;
    },
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
    triggerUpdate (state) {
      state.hasUpdates = true;
    }
  }
});

export const {
  openInviteModal,
  closeInviteModal,
  triggerUpdate
} = podsSlice.actions;

// Selectors
export const getIsCreatingPod = (state: RootState) => state.pods.isCreatingPod;
export const getCreatedPod = (state: RootState) => state.pods.createdPod;
export const getCreatedPodName = (state: RootState) => state.pods.createdPod?.name;
export const getPodList = (state: RootState) => state.pods.items;
export const getIsLoadingPods = (state: RootState) => state.pods.isLoadingPods;
export const getCurrentPod = (state: RootState) => state.pods.currentPod;
export const getCurrentPodId = (state: RootState) => state.pods.currentPod?._id;
export const getCurrentPodCreatorId = (state: RootState) => state.pods.currentPod?.createdBy?.id;
export const getCurrentPodMembers = (state: RootState) => state.pods.currentPod?.members ?? [];
export const getCurrentPodActiveMembers = (state: RootState) => state.pods.currentPod?.activeMembers ?? [];
export const getPlayQueue = (state: RootState) => state.pods.currentPod?.queue ?? [];
export const getPlayHistory = (state: RootState) => state.pods.currentPod?.history ?? [];
export const getIsConnectingToPod = (state: RootState) => state.pods.isConnecting;
export const getIsConnectedToPod = (state: RootState) => state.pods.isConnected;
export const getShouldUpdatePod = (state: RootState) => state.pods.hasUpdates;

export const getIsPodOwner = (state: RootState) => {
  const creatorId = getCurrentPodCreatorId(state);
  const profileId = state.spotify.profile?.id;
  return !!creatorId && !!profileId && creatorId === profileId;
};

// Thunks
export const createPod = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const profile = getProfile(getState());
  if (profile) {
    dispatch(podsSlice.actions.creatingPod());
    return podsApi.createPod(profile).then(pod => {
      dispatch(podsSlice.actions.podCreated(pod));
      return pod;
    });
  }
};

export const getPods = (options?: Record<string, string | number>) => (dispatch: AppDispatch) => {
  dispatch(podsSlice.actions.loadingPods());
  podsApi.getPods(options).then(pods => dispatch(podsSlice.actions.podsLoaded(pods)));
};

export const getPod = (podId: string, showLoading = true) => (dispatch: AppDispatch) => {
  if (showLoading) dispatch(podsSlice.actions.loadingPod());
  podsApi.getPod(podId).then(pod => dispatch(podsSlice.actions.podLoaded(pod)));
};

export const invitePeople = () => (dispatch: AppDispatch) => {
  dispatch(openInviteModal());
};

export const sendInvitation = (podId: string, messageType: string, to: string) => (_dispatch: AppDispatch) => {
  podsApi.sendInvitation(podId, messageType, to);
};

export const addMemberToPod = (podId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  const user = getProfile(getState());
  if (!user) return;
  dispatch(podsSlice.actions.addingMember());
  podsApi.addMemberToPod(podId, user).then(() => {
    dispatch(podsSlice.actions.addedMember());
    dispatch(getPods());
  });
};

export const removeMemberFromPod = (podId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  const user = getProfile(getState());
  if (!user) return;
  dispatch(podsSlice.actions.removingMember());
  podsApi.removeMemberFromPod(podId, user).then(() => {
    dispatch(podsSlice.actions.removedMember());
    dispatch(getPods());
  });
};

export const getPlayQueueAction = () => (_dispatch: AppDispatch, getState: () => RootState) => {
  const podId = getCurrentPodId(getState());
  podsApi.getPlayQueue(podId!);
};

export const addTrackToPlayQueue = (track: SpotifyTrack) => (_dispatch: AppDispatch, getState: () => RootState) => {
  const podId = getCurrentPodId(getState());
  podsApi.addToPlayQueue(podId!, track);
};

export const removeTrackFromPlayQueue = (track: SpotifyTrack) => (_dispatch: AppDispatch, getState: () => RootState) => {
  const podId = getCurrentPodId(getState());
  podsApi.removeFromPlayQueue(podId!, track);
};

export const getPlayHistoryAction = () => (_dispatch: AppDispatch, getState: () => RootState) => {
  const podId = getCurrentPodId(getState());
  podsApi.getPlayHistory(podId!);
};

export const addTrackToPlayHistory = (track: SpotifyTrack) => (dispatch: AppDispatch, getState: () => RootState) => {
  const podId = getCurrentPodId(getState());
  podsApi.addToPlayHistory(podId!, track).then(() => {
    dispatch(removeTrackFromPlayQueue(track));
  });
};

export const connectToPod = (podId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(podsSlice.actions.connectingClient());
  const user = getProfile(getState());
  if (!user) return;
  podsApi.addActiveMemberToPod(podId, user).then(() =>
    dispatch(podsSlice.actions.clientConnected())
  );
};

export const disconnectFromPod = (podId: string | undefined) => (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(podsSlice.actions.disconnectingClient());
  const user = getProfile(getState());
  if (!user) return;
  podsApi.removeActiveMemberFromPod(podId!, user).then(() =>
    dispatch(podsSlice.actions.clientDisconnected())
  );
};

export const launchPod = (podId: string | undefined) => () => podsApi.launchPod(podId!);

export default podsSlice.reducer;

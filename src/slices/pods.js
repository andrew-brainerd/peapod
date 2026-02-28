import { createSlice } from '@reduxjs/toolkit';
import * as podsApi from '../api/pods';
import { getProfile } from './spotify';

const podsSlice = createSlice({
  name: 'pods',
  initialState: {
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
  },
  reducers: {
    creatingPod (state) {
      state.isCreatingPod = true;
    },
    podCreated (state, action) {
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
    podLoaded (state, action) {
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
export const getIsCreatingPod = state => state.pods?.isCreatingPod;
export const getCreatedPod = state => state.pods?.createdPod;
export const getCreatedPodName = state => state.pods?.createdPod?.name;
export const getPodList = state => state.pods?.items;
export const getIsLoadingPods = state => state.pods?.isLoadingPods;
export const getCurrentPod = state => state.pods?.currentPod;
export const getCurrentPodId = state => state.pods?.currentPod?._id;
export const getCurrentPodCreatorId = state => state.pods?.currentPod?.createdBy?.id;
export const getCurrentPodMembers = state => state.pods?.currentPod?.members ?? [];
export const getCurrentPodActiveMembers = state => state.pods?.currentPod?.activeMembers ?? [];
export const getPlayQueue = state => state.pods?.currentPod?.queue ?? [];
export const getPlayHistory = state => state.pods?.currentPod?.history ?? [];
export const getIsConnectingToPod = state => state.pods?.isConnecting;
export const getIsConnectedToPod = state => state.pods?.isConnected;
export const getShouldUpdatePod = state => state.pods?.hasUpdates;

export const getIsPodOwner = state => {
  const creatorId = getCurrentPodCreatorId(state);
  const profileId = state.spotify?.profile?.id;
  return !!creatorId && !!profileId && creatorId === profileId;
};

// Thunks
export const createPod = () => (dispatch, getState) => {
  const profile = getProfile(getState());
  if (profile) {
    dispatch(podsSlice.actions.creatingPod());
    return podsApi.createPod(profile).then(pod => {
      dispatch(podsSlice.actions.podCreated(pod));
      return pod;
    });
  }
};

export const getPods = options => dispatch => {
  dispatch(podsSlice.actions.loadingPods());
  podsApi.getPods(options).then(pods => dispatch(podsSlice.actions.podsLoaded(pods)));
};

export const getPod = (podId, showLoading = true) => dispatch => {
  if (showLoading) dispatch(podsSlice.actions.loadingPod());
  podsApi.getPod(podId).then(pod => dispatch(podsSlice.actions.podLoaded(pod)));
};

export const invitePeople = () => dispatch => {
  dispatch(openInviteModal());
};

export const sendInvitation = (podId, messageType, to) => dispatch => {
  podsApi.sendInvitation(podId, messageType, to);
};

export const addMemberToPod = podId => (dispatch, getState) => {
  const user = getProfile(getState());
  dispatch(podsSlice.actions.addingMember());
  podsApi.addMemberToPod(podId, user).then(() => {
    dispatch(podsSlice.actions.addedMember());
    dispatch(getPods());
  });
};

export const removeMemberFromPod = podId => (dispatch, getState) => {
  const user = getProfile(getState());
  dispatch(podsSlice.actions.removingMember());
  podsApi.removeMemberFromPod(podId, user).then(() => {
    dispatch(podsSlice.actions.removedMember());
    dispatch(getPods());
  });
};

export const getPlayQueueAction = () => (dispatch, getState) => {
  const podId = getCurrentPodId(getState());
  podsApi.getPlayQueue(podId);
};

export const addTrackToPlayQueue = track => (dispatch, getState) => {
  const podId = getCurrentPodId(getState());
  podsApi.addToPlayQueue(podId, track);
};

export const removeTrackFromPlayQueue = track => (dispatch, getState) => {
  const podId = getCurrentPodId(getState());
  podsApi.removeFromPlayQueue(podId, track);
};

export const getPlayHistoryAction = () => (dispatch, getState) => {
  const podId = getCurrentPodId(getState());
  podsApi.getPlayHistory(podId);
};

export const addTrackToPlayHistory = track => (dispatch, getState) => {
  const podId = getCurrentPodId(getState());
  podsApi.addToPlayHistory(podId, track).then(() => {
    dispatch(removeTrackFromPlayQueue(track));
  });
};

export const connectToPod = podId => (dispatch, getState) => {
  dispatch(podsSlice.actions.connectingClient());
  const user = getProfile(getState());
  podsApi.addActiveMemberToPod(podId, user).then(() =>
    dispatch(podsSlice.actions.clientConnected())
  );
};

export const disconnectFromPod = podId => (dispatch, getState) => {
  dispatch(podsSlice.actions.disconnectingClient());
  const user = getProfile(getState());
  podsApi.removeActiveMemberFromPod(podId, user).then(() =>
    dispatch(podsSlice.actions.clientDisconnected())
  );
};

export const launchPod = podId => () => podsApi.launchPod(podId);

export default podsSlice.reducer;

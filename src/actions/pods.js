import * as pods from '../api/pods';
import { getCurrentPodId } from '../selectors/pods';
import { getProfile } from '../selectors/spotify';

const PREFIX = 'PODS';

export const CREATING_POD = `${PREFIX}/CREATING_POD`;
export const POD_CREATED = `${PREFIX}/POD_CREATED`;
export const LOADING_PODS = `${PREFIX}/LOADING_PODS`;
export const PODS_LOADED = `${PREFIX}/PODS_LOADED`;
export const LOADING_POD = `${PREFIX}/LOADING_POD`;
export const POD_LOADED = `${PREFIX}/POD_LOADED`;
export const ADDING_MEMBER_TO_POD = `${PREFIX}/ADDING_MEMBER_TO_POD`;
export const ADDED_MEMBER_TO_POD = `${PREFIX}/ADDED_MEMBER_TO_POD`;
export const REMOVING_MEMBER_FROM_POD = `${PREFIX}/REMOVING_MEMBER_FROM_POD`;
export const REMOVED_MEMBER_FROM_POD = `${PREFIX}/REMOVED_MEMBER_FROM_POD`;
export const OPEN_INVITE_MODAL = `${PREFIX}/OPEN_INVITE_MODAL`;
export const CLOSE_INVITE_MODAL = `${PREFIX}/CLOSE_INVITE_MODAL`;
export const SENDING_INVITATION = `${PREFIX}/SENDING_INVITATION`;
export const INVITATION_SENT = `${PREFIX}/INVITATION_SENT`;
export const LOADING_PLAY_QUEUE = `${PREFIX}/LOADING_PLAY_QUEUE`;
export const PLAY_QUEUE_LOADED = `${PREFIX}/PLAY_QUEUE_LOADED`;
export const LOADING_PLAY_HISTORY = `${PREFIX}/LOADING_PLAY_HISTORY`;
export const PLAY_HISTORY_LOADED = `${PREFIX}/PLAY_HISTORY_LOADED`;
export const ADDING_TRACK_TO_PLAY_QUEUE = `${PREFIX}/ADDING_TRACK_TO_PLAY_QUEUE`;
export const TRACK_ADDED_TO_PLAY_QUEUE = `${PREFIX}/TRACK_ADDED_TO_PLAY_QUEUE`;
export const REMOVING_TRACK_FROM_PLAY_QUEUE = `${PREFIX}/REMOVING_TRACK_FROM_PLAY_QUEUE`;
export const TRACK_REMOVED_FROM_PLAY_QUEUE = `${PREFIX}/TRACK_REMOVED_FROM_PLAY_QUEUE`;
export const ADDING_TRACK_TO_PLAY_HISTORY = `${PREFIX}/ADDING_TRACK_TO_PLAY_HISTORY`;
export const TRACK_ADDED_TO_PLAY_HISTORY = `${PREFIX}/TRACK_ADDED_TO_PLAY_HISTORY`;
export const CONNECTING_CLIENT = `${PREFIX}/CONNECTING_CLIENT`;
export const CLIENT_CONNECTED = `${PREFIX}/CLIENT_CONNECTED`;
export const DISCONNECTING_CLIENT = `${PREFIX}/DISCONNECTING_CLIENT`;
export const CLIENT_DISCONNECTED = `${PREFIX}/CLIENT_DISCONNECTED`;

export const creatingPod = { type: CREATING_POD };

export const podCreated = pod => ({ type: POD_CREATED, pod });

export const loadingPods = { type: LOADING_PODS };

export const podsLoaded = pods => ({ type: PODS_LOADED, pods });

export const loadingPod = { type: LOADING_POD };

export const podLoaded = pod => ({ type: POD_LOADED, pod });

export const openInviteModal = { type: OPEN_INVITE_MODAL };

export const closeInviteModal = { type: CLOSE_INVITE_MODAL };

export const sendingInvitation = { type: SENDING_INVITATION };

export const invitationSent = { type: INVITATION_SENT };

export const addingMemberToPod = { type: ADDING_MEMBER_TO_POD };

export const addedMemberToPod = { type: ADDED_MEMBER_TO_POD };

export const removingMemberFromPod = { type: REMOVING_MEMBER_FROM_POD };

export const removedMemberFromPod = { type: REMOVED_MEMBER_FROM_POD };

export const loadingPlayQueue = { type: LOADING_PLAY_QUEUE };

export const playQueueLoaded = queue => ({ type: PLAY_QUEUE_LOADED });

export const loadingPlayHistory = { type: LOADING_PLAY_HISTORY };

export const playHistoryLoaded = history => ({ type: PLAY_HISTORY_LOADED });

export const addingTrackToPlayQueue = { type: ADDING_TRACK_TO_PLAY_QUEUE };

export const trackAddedToPlayQueue = track => ({ type: TRACK_ADDED_TO_PLAY_QUEUE, track });

export const removingTrackFromPlayQueue = { type: REMOVING_TRACK_FROM_PLAY_QUEUE };

export const trackRemovedFromPlayQueue = track => ({ type: TRACK_REMOVED_FROM_PLAY_QUEUE, track });

export const addingTrackToPlayHistory = { type: ADDING_TRACK_TO_PLAY_HISTORY };

export const trackAddedToPlayHistory = track => ({ type: TRACK_ADDED_TO_PLAY_HISTORY, track });

export const connectingClient = { type: CONNECTING_CLIENT };

export const clientConnected = { type: CLIENT_CONNECTED };

export const disconnectingClient = { type: DISCONNECTING_CLIENT };

export const clientDisconnected = { type: CLIENT_DISCONNECTED };

export const createPod = name => async (dispatch, getState) => {
  const profile = getProfile(getState());
  const createdBy = {
    id: profile.id,
    name: profile.display_name,
    email: profile.email
  };

  name && profile && dispatch(creatingPod);
  return name && profile && pods.createPod(name, createdBy).then(
    pod => {
      dispatch(podCreated(pod));
      return pod;
    }
  );
};

export const getPods = options => async dispatch => {
  dispatch(loadingPods);
  pods.getPods(options).then(
    pods => dispatch(podsLoaded(pods))
  );
};

export const getPod = (podId, showLoading = true) => async dispatch => {
  showLoading && dispatch(loadingPod);
  pods.getPod(podId).then(
    pod => dispatch(podLoaded(pod))
  );
};

export const invitePeople = () => async dispatch => {
  dispatch(openInviteModal);
};

export const sendInvitation = (podId, messageType, to) => async dispatch => {
  dispatch(sendingInvitation);
  pods.sendInvitation(podId, messageType, to).then(() => {
    dispatch(invitationSent);
  });
};

export const addMemberToPod = podId => async (dispatch, getState) => {
  const user = getProfile(getState());
  dispatch(addingMemberToPod);
  pods.addMemberToPod(podId, user).then(() => {
    dispatch(addedMemberToPod);
    dispatch(getPods());
  });
};

export const removeMemberFromPod = podId => async (dispatch, getState) => {
  const user = getProfile(getState());
  dispatch(removingMemberFromPod);
  pods.removeMemberFromPod(podId, user).then(() => {
    dispatch(removedMemberFromPod);
    dispatch(getPods());
  });
};

export const getPlayQueue = () => async (dispatch, getState) => {
  const podId = getCurrentPodId(getState());
  dispatch(loadingPlayQueue);
  pods.getPlayQueue(podId).then(queue =>
    dispatch(playQueueLoaded(queue))
  );
};

export const addTrackToPlayQueue = track => async (dispatch, getState) => {
  const podId = getCurrentPodId(getState());
  dispatch(addingTrackToPlayQueue);
  pods.addToPlayQueue(podId, track).then(data =>
    dispatch(trackAddedToPlayQueue(track))
  );
};

export const removeTrackFromPlayQueue = track => async (dispatch, getState) => {
  const podId = getCurrentPodId(getState());
  dispatch(removingTrackFromPlayQueue);
  pods.removeFromPlayQueue(podId, track).then(data =>
    dispatch(trackRemovedFromPlayQueue(track))
  );
};

export const getPlayHistory = () => async (dispatch, getState) => {
  const podId = getCurrentPodId(getState());
  dispatch(loadingPlayHistory);
  pods.getPlayHistory(podId).then(history =>
    dispatch(playHistoryLoaded(history))
  );
};

export const addTrackToPlayHistory = track => async (dispatch, getState) => {
  const podId = getCurrentPodId(getState());
  dispatch(addingTrackToPlayHistory);
  pods.addToPlayHistory(podId, track).then(data => {
    dispatch(trackAddedToPlayHistory(track));
    dispatch(removeTrackFromPlayQueue(track));
  });
};

export const connectToPod = podId => async (dispatch, getState) => {
  dispatch(connectingClient);
  const user = getProfile(getState());
  pods.addActiveMemberToPod(podId, user).then(data =>
    dispatch(clientConnected)
  );
};

export const disconnectFromPod = podId => async (dispatch, getState) => {
  dispatch(disconnectingClient);
  const user = getProfile(getState());
  pods.removeActiveMemberFromPod(podId, user).then(data =>
    dispatch(clientDisconnected)
  );
};

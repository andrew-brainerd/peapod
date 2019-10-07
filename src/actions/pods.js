import * as pods from '../api/pods';
import { getCurrentUser } from '../selectors/users';

const PREFIX = 'PODS';

export const CREATING_POD = `${PREFIX}/CREATING_POD`;
export const POD_CREATED = `${PREFIX}/POD_CREATED`;
export const LOADING_PODS = `${PREFIX}/LOADING_PODS`;
export const PODS_LOADED = `${PREFIX}/PODS_LOADED`;
export const ADDING_MEMBER_TO_POD = `${PREFIX}/ADDING_MEMBER_TO_POD`;
export const ADDED_MEMBER_TO_POD = `${PREFIX}/ADDED_MEMBER_TO_POD`;
export const REMOVING_MEMBER_FROM_POD = `${PREFIX}/REMOVING_MEMBER_FROM_POD`;
export const REMOVED_MEMBER_FROM_POD = `${PREFIX}/REMOVED_MEMBER_FROM_POD`;

export const creatingPod = ({ type: CREATING_POD });

export const podCreated = pod => ({ type: POD_CREATED, pod });

export const loadingPods = ({ type: LOADING_PODS });

export const podsLoaded = pods => ({ type: PODS_LOADED, pods });

export const addingMemberToPod = ({ type: ADDING_MEMBER_TO_POD });

export const addedMemberToPod = ({ type: ADDED_MEMBER_TO_POD });

export const removingMemberFromPod = ({ type: REMOVING_MEMBER_FROM_POD });

export const removedMemberFromPod = ({ type: REMOVED_MEMBER_FROM_POD });

export const createPod = name => async dispatch => {
  dispatch(creatingPod);
  pods.createPod(name).then(
    pod => dispatch(podCreated(pod))
  );
}

export const getPods = () => async dispatch => {
  dispatch(loadingPods);
  pods.getPods().then(
    pods => dispatch(podsLoaded(pods))
  );
}

export const addMemberToPod = podId => async (dispatch, getState) => {
  const user = getCurrentUser(getState());
  dispatch(addingMemberToPod);
  pods.addMemberToPod(podId, user).then(() => {
    dispatch(addedMemberToPod);
    dispatch(getPods());
  });
}

export const removeMemberFromPod = podId => async (dispatch, getState) => {
  const user = getCurrentUser(getState());
  dispatch(removingMemberFromPod);
  pods.removeMemberFromPod(podId, user).then(() => {
    dispatch(removedMemberFromPod);
    dispatch(getPods());
  });
}

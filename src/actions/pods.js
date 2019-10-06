import * as pods from '../api/pods';

const PREFIX = 'PODS';

export const CREATING_POD = `${PREFIX}/CREATING_POD`;
export const POD_CREATED = `${PREFIX}/POD_CREATED`;
export const LOADING_PODS = `${PREFIX}/LOADING_PODS`;
export const PODS_LOADED = `${PREFIX}/PODS_LOADED`;

export const creatingPod = ({ type: CREATING_POD });

export const podCreated = pod => ({ type: POD_CREATED, pod });

export const loadingPods = ({ type: LOADING_PODS });

export const podsLoaded = pods => ({ type: PODS_LOADED, pods });

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

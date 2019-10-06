import * as pods from '../api/pods';

const PREFIX = 'PODS';

export const CREATING_POD = `${PREFIX}/CREATING_POD`;
export const POD_CREATED = `${PREFIX}/POD_CREATED`;

export const creatingPod = ({ type: CREATING_POD });

export const podCreated = pod => ({ type: POD_CREATED, pod });

export const createPod = name => async dispatch => {
  dispatch(creatingPod);
  pods.createPod(name).then(
    pod => dispatch(podCreated(pod))
  );
}

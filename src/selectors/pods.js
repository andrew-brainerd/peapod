import { compose, path, prop, propOr } from 'ramda';

export const getIsCreatingPod = path(['pods', 'isCreatingPod']);

export const getCreatedPod = path(['pods', 'createdPod']);

export const getCreatedPodName = compose(prop('name'), getCreatedPod);

export const getPodList = path(['pods', 'items']);

export const getCurrentPod = path(['pods', 'currentPod']);

export const getCurrentPodId = compose(prop('_id'), getCurrentPod);

export const getPlayQueue = compose(propOr([], 'queue'), getCurrentPod);

export const getPlayHistory = compose(propOr([], 'history'), getCurrentPod);

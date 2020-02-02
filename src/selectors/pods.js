import { compose, path, pathOr, prop, propOr } from 'ramda';

export const getIsCreatingPod = path(['pods', 'isCreatingPod']);

export const getCreatedPod = path(['pods', 'createdPod']);

export const getCreatedPodName = compose(prop('name'), getCreatedPod);

export const getPodList = path(['pods', 'items']);

export const getCurrentPod = path(['pods', 'currentPod']);

export const getCurrentPodId = compose(prop('_id'), getCurrentPod);

export const getQueue = pathOr({}, ['pods', 'queue']);

export const getHistory = pathOr({}, ['pods', 'history']);

export const getPlayList = compose(propOr([], 'tracks'), getCurrentPod);

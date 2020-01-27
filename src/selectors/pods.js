import { compose, path, prop, propOr } from 'ramda';

export const getCreatedPod = path(['pods', 'createdPod']);

export const getCreatedPodName = compose(prop('name'), getCreatedPod);

export const getPodList = path(['pods', 'items']);

export const getCurrentPod = path(['pods', 'currentPod']);

export const getPlayList = compose(propOr([], 'tracks'), getCurrentPod);

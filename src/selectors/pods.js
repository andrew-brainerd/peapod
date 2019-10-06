import { path, prop } from 'ramda';
import { createSelector } from 'reselect';

export const getCreatedPod = path(['pods', 'createdPod']);

export const getCreatedPodName = createSelector(getCreatedPod, prop('name'));

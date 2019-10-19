import { path, prop } from 'ramda';
import { createSelector } from 'reselect';

export const getCurrentUser = path(['users', 'currentUser']);

export const getCurrentUserId = createSelector(getCurrentUser, prop('_id'));

export const getCurrentUserName = createSelector(getCurrentUser, prop('name'));

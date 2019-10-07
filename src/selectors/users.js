import { prop } from 'ramda';
import { createSelector } from 'reselect';

export const getCurrentUser = prop('user');

export const getCurrentUserName = createSelector(getCurrentUser, prop('name'));

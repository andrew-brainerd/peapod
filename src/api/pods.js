import { prop } from 'ramda';
import { client, PEAPOD_API_URL } from './tools';
import '../utils/beaconFallback';

export const createPod = async createdBy => {
  const response = await client.post('/pods', { createdBy });
  return prop('data', response);
};

export const getPod = async podId => {
  const response = await client.get(`/pods/${podId}`);
  return prop('data', response);
};

export const addMemberToPod = async (podId, user) => {
  const response = await client.patch(`/pods/${podId}/members`, { user });
  return prop('data', response);
};

export const removeMemberFromPod = async (podId, user) => {
  const response = await client.delete(`/pods/${podId}/members`, { user });
  return prop('data', response);
};

export const sendInvitation = async (podId, messageType, to) => {
  const response = await client.post(`/pods/${podId}/invite`, {
    messageType: messageType || 'sms',
    to
  });
  return prop('data', response);
};

export const getPlayQueue = async podId => {
  const response = await client.get(`/pods/${podId}/queue`);
  return prop('data', response);
};

export const getPlayHistory = async podId => {
  const response = await client.get(`/pods/${podId}/history`);
  return prop('data', response);
};

export const addToPlayQueue = async (podId, track) => {
  const response = await client.patch(`/pods/${podId}/queue`, { track });
  return prop('data', response);
};

export const removeFromPlayQueue = async (podId, track) => {
  const response = await client.delete(`/pods/${podId}/queue`, { track });
  return prop('data', response);
};

export const addToPlayHistory = async (podId, track) => {
  const response = await client.patch(`/pods/${podId}/history`, { track });
  return prop('data', response);
};

export const addActiveMemberToPod = async (podId, user) => {
  const response = await client.patch(`/pods/${podId}/activeMembers`, { user });
  return prop('data', response);
};

export const removeActiveMemberFromPod = async (podId, user) => {
  navigator.sendBeacon(`${PEAPOD_API_URL}/pods/${podId}/activeMembers/${user.id}`);
};

export const launchPod = async podId => {
  const response = await client.put(`/pods/${podId}/launch`);
  return prop('data', response);
};

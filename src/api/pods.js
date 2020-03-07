import { basicJsonHeader, handleResponse, parseOptions } from './tools';
import '../utils/beaconFallback';

const PEAPOD_API_URL = process.env.REACT_APP_PEAPOD_API_URL || 'http://localhost:5000';

export const createPod = async (name, createdBy) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ name, createdBy })
  });

  handleResponse(response, 201);
  const json = await response.json();

  return json;
};

export const getPods = async options => {
  const query = parseOptions(options);
  const response = await fetch(`${PEAPOD_API_URL}/api/pods${query}`, {
    headers: basicJsonHeader
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getPod = async podId => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}`, {
    headers: basicJsonHeader
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const addMemberToPod = async (podId, user) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/members`, {
    method: 'PATCH',
    headers: basicJsonHeader,
    body: JSON.stringify({ user })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const removeMemberFromPod = async (podId, user) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/members`, {
    method: 'DELETE',
    headers: basicJsonHeader,
    body: JSON.stringify({ user })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const sendInvitation = async (podId, messageType, to) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/invite`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ messageType: messageType || 'sms', to })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getPlayQueue = async podId => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/queue`);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getPlayHistory = async podId => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/history`);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const addToPlayQueue = async (podId, track) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/queue`, {
    method: 'PATCH',
    headers: basicJsonHeader,
    body: JSON.stringify({ track })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const removeFromPlayQueue = async (podId, track) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/queue`, {
    method: 'DELETE',
    headers: basicJsonHeader,
    body: JSON.stringify({ track })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const addToPlayHistory = async (podId, track) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/history`, {
    method: 'PATCH',
    headers: basicJsonHeader,
    body: JSON.stringify({ track })
  });

  handleResponse(response, 409);
  const json = await response.json();

  return json;
};

export const addActiveMemberToPod = async (podId, user) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/activeMembers`, {
    method: 'PATCH',
    headers: basicJsonHeader,
    body: JSON.stringify({ user })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const removeActiveMemberFromPod = async (podId, user) => {
  navigator.sendBeacon(`${PEAPOD_API_URL}/api/pods/${podId}/activeMembers/${user.id}`);
};

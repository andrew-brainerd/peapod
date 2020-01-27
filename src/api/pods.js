import { basicJsonHeader, handleResponse, parseOptions } from './tools';

const PEAPOD_API_URL = process.env.REACT_APP_PEAPOD_API_URL || 'http://localhost:5000';

export const createPod = async name => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ name })
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

export const addToPlayHistory = async (podId, track) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/tracks`, {
    method: 'PATCH',
    headers: basicJsonHeader,
    body: JSON.stringify({ track })
  });

  handleResponse(response, 429);
  const json = await response.json();

  return json;
};

import { handleResponse } from './tools';

const basicJsonHeader = { 'Content-Type': 'application/json' };

const PEAPOD_API_URL = process.env.REACT_APP_PEAPOD_API_URL || 'http://localhost:5000';

export const createPod = async name => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ name })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getPods = async () => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods`, {
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

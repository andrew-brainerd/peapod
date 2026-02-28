import { basicJsonHeader, handleResponse, parseOptions } from './tools';
import type { SpotifyProfile, SpotifyTrack } from '../types';
import '../utils/beaconFallback';

const PEAPOD_API_URL = import.meta.env.VITE_PEAPOD_API_URL || 'http://localhost:3001';

export const createPod = async (createdBy: SpotifyProfile) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ createdBy })
  });

  handleResponse(response, 201);
  const json = await response.json();

  return json;
};

export const getPods = async (options?: Record<string, string | number>) => {
  const query = parseOptions(options);
  const response = await fetch(`${PEAPOD_API_URL}/api/pods${query}`, {
    headers: basicJsonHeader
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getPod = async (podId: string) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}`, {
    headers: basicJsonHeader
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const addMemberToPod = async (podId: string, user: SpotifyProfile) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/members`, {
    method: 'PATCH',
    headers: basicJsonHeader,
    body: JSON.stringify({ user })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const removeMemberFromPod = async (podId: string, user: SpotifyProfile) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/members`, {
    method: 'DELETE',
    headers: basicJsonHeader,
    body: JSON.stringify({ user })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const sendInvitation = async (podId: string, messageType: string, to: string) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/invite`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ messageType: messageType || 'sms', to })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getPlayQueue = async (podId: string) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/queue`);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getPlayHistory = async (podId: string) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/history`);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const addToPlayQueue = async (podId: string, track: SpotifyTrack) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/queue`, {
    method: 'PATCH',
    headers: basicJsonHeader,
    body: JSON.stringify({ track })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const removeFromPlayQueue = async (podId: string, track: SpotifyTrack) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/queue`, {
    method: 'DELETE',
    headers: basicJsonHeader,
    body: JSON.stringify({ track })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const addToPlayHistory = async (podId: string, track: SpotifyTrack) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/history`, {
    method: 'PATCH',
    headers: basicJsonHeader,
    body: JSON.stringify({ track })
  });

  handleResponse(response, 409);
  const json = await response.json();

  return json;
};

export const addActiveMemberToPod = async (podId: string, user: SpotifyProfile) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/activeMembers`, {
    method: 'PATCH',
    headers: basicJsonHeader,
    body: JSON.stringify({ user })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const removeActiveMemberFromPod = async (podId: string, user: { id: string }) => {
  navigator.sendBeacon(`${PEAPOD_API_URL}/api/pods/${podId}/activeMembers/${user.id}`);
};

export const launchPod = async (podId: string) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/pods/${podId}/launch`, {
    method: 'PUT',
    headers: basicJsonHeader
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

import { basicJsonHeader, authHeaders, handleResponse } from './tools';
import { setLocalReturnUri } from '../utils/spotify';

const PEAPOD_API_URL = import.meta.env.VITE_PEAPOD_API_URL || '';

export const getAuth = async (returnUri: string) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/auth`);

  handleResponse(response);
  const { authUrl } = await response.json();

  setLocalReturnUri(returnUri);
  window.location = authUrl;
};

export const refreshAuth = async (accessToken: string | null, refreshToken: string | null) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/auth`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ accessToken, refreshToken })
  });

  handleResponse(response);
  const json = await response.json();
  const { body } = json.response;

  return { ...body } as { access_token: string; expires_in: number };
};

export const getProfile = async () => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/profile`, {
    headers: authHeaders()
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getMyTopTracks = async () => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/myTopTracks`, {
    headers: authHeaders()
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getMyDevices = async () => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/myDevices`, {
    headers: authHeaders()
  });

  handleResponse(response);
  const { devices } = await response.json();

  return devices;
};

export const getMyNowPlaying = async () => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/myNowPlaying`, {
    headers: authHeaders()
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const transferPlayback = async (devices: string[], shouldPlay = false) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/transferPlayback`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ devices, shouldPlay })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const play = async (options?: { uris?: string[] }) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/play`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(options)
  });

  handleResponse(response, 204);
  const json = await response.json();

  return json;
};

export const pause = async () => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/pause`, {
    method: 'PUT',
    headers: authHeaders()
  });

  handleResponse(response, 204);
  const json = await response.json();

  return json;
};

export const search = async (searchText: string, types: string[], options?: unknown) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/search`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ searchText, types, options })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getMyPlaylists = async (userId: string) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/playlists/${userId}`, {
    headers: authHeaders()
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getPlaylist = async (playlistId: string) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/playlists/${playlistId}`, {
    headers: authHeaders()
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

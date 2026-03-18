import { basicJsonHeader, handleResponse } from './tools';
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

export const getProfile = async (accessToken: string | null) => {
  const url = `${PEAPOD_API_URL}/api/spotify/profile?accessToken=${accessToken}`;

  const response = await fetch(url);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getMyTopTracks = async (accessToken: string | null) => {
  const url = `${PEAPOD_API_URL}/api/spotify/myTopTracks?accessToken=${accessToken}`;

  const response = await fetch(url);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getMyDevices = async (accessToken: string | null) => {
  const url = `${PEAPOD_API_URL}/api/spotify/myDevices?accessToken=${accessToken}`;

  const response = await fetch(url);

  handleResponse(response);
  const { devices } = await response.json();

  return devices;
};

export const getMyNowPlaying = async (accessToken: string | null) => {
  const url = `${PEAPOD_API_URL}/api/spotify/myNowPlaying?accessToken=${accessToken}`;

  const response = await fetch(url);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const transferPlayback = async (accessToken: string | null, devices: string[], shouldPlay = false) => {
  const url = `${PEAPOD_API_URL}/api/spotify/transferPlayback?accessToken=${accessToken}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: basicJsonHeader,
    body: JSON.stringify({ devices, shouldPlay })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const play = async (accessToken: string | null, options?: { uris?: string[] }) => {
  const url = `${PEAPOD_API_URL}/api/spotify/play?accessToken=${accessToken}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: basicJsonHeader,
    body: JSON.stringify(options)
  });

  handleResponse(response, 204);
  const json = await response.json();

  return json;
};

export const pause = async (accessToken: string | null) => {
  const url = `${PEAPOD_API_URL}/api/spotify/pause?accessToken=${accessToken}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: basicJsonHeader
  });

  handleResponse(response, 204);
  const json = await response.json();

  return json;
};

export const search = async (
  accessToken: string | null,
  searchText: string,
  types: string[],
  options?: unknown
) => {
  const url = `${PEAPOD_API_URL}/api/spotify/search?accessToken=${accessToken}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ searchText, types, options })
  });

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getMyPlaylists = async (accessToken: string | null, userId: string) => {
  const url = `${PEAPOD_API_URL}/api/spotify/playlists/${userId}?accessToken=${accessToken}`;

  const response = await fetch(url);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getPlaylist = async (accessToken: string | null, playlistId: string) => {
  const url = `${PEAPOD_API_URL}/api/spotify/playlists/${playlistId}?accessToken=${accessToken}`;

  const response = await fetch(url);

  handleResponse(response);
  const json = await response.json();

  return json;
};

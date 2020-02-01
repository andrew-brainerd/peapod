import { basicJsonHeader, handleResponse } from './tools';
import { setLocalReturnUri } from '../utils/spotify';

const PEAPOD_API_URL = process.env.REACT_APP_PEAPOD_API_URL || 'http://localhost:5000';

export const getAuth = async returnUri => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/auth`);

  handleResponse(response);
  const { authUrl } = await response.json();

  setLocalReturnUri(returnUri);
  window.location = authUrl;
};

export const refreshAuth = async (accessToken, refreshToken) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/auth`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ accessToken, refreshToken })
  });

  handleResponse(response);
  const json = await response.json();
  const { body } = json.response;

  return { ...body };
};

export const getProfile = async accessToken => {
  const url = `${PEAPOD_API_URL}/api/spotify/profile?accessToken=${accessToken}`;

  const response = await fetch(url);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getMyTopTracks = async accessToken => {
  const url = `${PEAPOD_API_URL}/api/spotify/myTopTracks?accessToken=${accessToken}`;

  const response = await fetch(url);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getMyDevices = async accessToken => {
  const url = `${PEAPOD_API_URL}/api/spotify/myDevices?accessToken=${accessToken}`;

  const response = await fetch(url);

  handleResponse(response);
  const { devices } = await response.json();

  return devices;
};

export const getMyNowPlaying = async accessToken => {
  const url = `${PEAPOD_API_URL}/api/spotify/myNowPlaying?accessToken=${accessToken}`;

  const response = await fetch(url);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const transferPlayback = async (accessToken, devices, shouldPlay = false) => {
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

export const play = async (accessToken, uris) => {
  console.log(`Play: %o`, { uris });
  const url = `${PEAPOD_API_URL}/api/spotify/play?accessToken=${accessToken}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: basicJsonHeader,
    body: JSON.stringify({ uris: uris || [] })
  });

  handleResponse(response, 204);
  const json = await response.json();

  return json;
};

export const pause = async accessToken => {
  const url = `${PEAPOD_API_URL}/api/spotify/pause?accessToken=${accessToken}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: basicJsonHeader
  });

  handleResponse(response, 204);
  const json = await response.json();

  return json;
};

export const search = async (accessToken, searchText, types, options) => {
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

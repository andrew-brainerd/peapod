import { path, prop } from 'ramda';
import { basicJsonHeader, handleResponse, client } from './tools';
import { setLocalReturnUri } from '../utils/spotify';

const PEAPOD_API_URL = process.env.REACT_APP_PEAPOD_API_URL || 'http://localhost:5000';

export const getAuth = async returnUri => {
  const response = await client.get('/spotify/auth');
  setLocalReturnUri(returnUri);
  window.location = path(['data', 'authUrl'], response);
};

export const refreshAuth = async (accessToken, refreshToken) => {
  const response = await client.post('/spotify/auth', { accessToken, refreshToken });
  return path(['data', 'response', 'body'], response);
};

export const getProfile = async accessToken => {
  const response = await client.get('/spotify/profile', { params: { accessToken } });
  return prop('data', response);
};

export const getMyTopTracks = async accessToken => {
  const response = await client.get('/spotify/myTopTracks', { params: { accessToken } });
  return prop('data', response);
};

export const getMyDevices = async accessToken => {
  const response = await client.get('/spotify/myDevices', { params: { accessToken } });
  return path(['data', 'devices'], response);
};

export const getMyNowPlaying = async accessToken => {
  const response = await client.get('/spotify/myNowPlaying', { params: { accessToken } });
  return prop('data', response);
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

export const play = async (accessToken, options) => {
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

export const getMyPlaylists = async (accessToken, userId) => {
  const url = `${PEAPOD_API_URL}/api/spotify/playlists/${userId}?accessToken=${accessToken}`;

  const response = await fetch(url);

  handleResponse(response);
  const json = await response.json();

  return json;
};

export const getPlaylist = async (accessToken, playlistId) => {
  const url = `${PEAPOD_API_URL}/api/spotify/playlists/${playlistId}?accessToken=${accessToken}`;

  const response = await fetch(url);

  handleResponse(response);
  const json = await response.json();

  return json;
};


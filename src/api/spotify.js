import { handleResponse } from './tools';

const PEAPOD_API_URL = process.env.REACT_APP_PEAPOD_API_URL || 'http://localhost:5000';

export const getAuth = async returnUri => {
  const response = await fetch(`${PEAPOD_API_URL}/api/spotify/auth`);

  handleResponse(response);
  const { authUrl } = await response.json();

  localStorage.setItem('spotifyReturnUri', returnUri);
  window.location = authUrl;
};

export const getLogicAlbums = async accessToken => {
  const url = `${PEAPOD_API_URL}/api/spotify/artistAlbums?accessToken=${accessToken}`;

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

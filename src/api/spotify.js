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

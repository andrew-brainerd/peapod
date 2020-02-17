import { basicJsonHeader, handleResponse } from './tools';

const PEAPOD_API_URL = process.env.REACT_APP_PEAPOD_API_URL || 'http://localhost:5000';

export const pushNowPlayingToClients = async (podId, nowPlaying) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/sync?podId=${podId}`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ nowPlaying })
  });

  handleResponse(response, 201);
  const json = await response.json();

  return json;
};

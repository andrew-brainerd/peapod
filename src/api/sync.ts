import { basicJsonHeader, handleResponse } from './tools';
import type { NowPlaying } from '../types';

const PEAPOD_API_URL = import.meta.env.VITE_PEAPOD_API_URL || '';

export const pushNowPlayingToClients = async (podId: string | undefined, nowPlaying: NowPlaying) => {
  const response = await fetch(`${PEAPOD_API_URL}/api/sync?podId=${podId}`, {
    method: 'POST',
    headers: basicJsonHeader,
    body: JSON.stringify({ nowPlaying })
  });

  handleResponse(response, 201);
  const json = await response.json();

  return json;
};

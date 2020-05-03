import { prop } from 'ramda';
import { client } from './tools';

export const pushNowPlayingToClients = async (podId, nowPlaying) => {
  const response = await client.post(`/sync?podId=${podId}`, { nowPlaying });
  return prop('data', response);
};

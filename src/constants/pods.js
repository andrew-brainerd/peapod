import { POD_SEARCH_ROUTE, POD_PLAYER_ROUTE, POD_QUEUE_ROUTE, POD_HISTORY_ROUTE } from './routes';

export const SEARCH = 'search';
export const NOW_PLAYING = 'nowPlaying';
export const PLAY_QUEUE = 'queue';
export const PLAY_HISTORY = 'history'

export const podViews = {
  [SEARCH]: {
    name: 'Search',
    path: POD_SEARCH_ROUTE
  },
  [NOW_PLAYING]: {
    name: 'Now Playing',
    path: POD_PLAYER_ROUTE
  },
  [PLAY_QUEUE]: {
    name: 'Queue',
    path: POD_QUEUE_ROUTE
  },
  [PLAY_HISTORY]: {
    name: 'History',
    path: POD_HISTORY_ROUTE
  }
};

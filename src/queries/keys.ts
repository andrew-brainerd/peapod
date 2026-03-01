export const spotifyKeys = {
  all: ['spotify'] as const,
  profile: () => [...spotifyKeys.all, 'profile'] as const,
  topTracks: () => [...spotifyKeys.all, 'topTracks'] as const,
  devices: () => [...spotifyKeys.all, 'devices'] as const,
  nowPlaying: () => [...spotifyKeys.all, 'nowPlaying'] as const,
  search: (text: string) => [...spotifyKeys.all, 'search', text] as const,
  playlists: (userId: string) => [...spotifyKeys.all, 'playlists', userId] as const
};

export const podKeys = {
  all: ['pods'] as const,
  list: (opts?: Record<string, string | number>) => [...podKeys.all, 'list', opts] as const,
  detail: (podId: string) => [...podKeys.all, 'detail', podId] as const
};

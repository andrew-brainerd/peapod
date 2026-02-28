import type { NowPlaying, SpotifyTrack, SpotifyAlbum, SpotifyImage } from '../types';

export const getIsPlaying = (obj: NowPlaying): boolean | undefined => obj?.is_playing;

export const getTrackProgress = (obj: NowPlaying): number | undefined => obj?.progress_ms;

export const getNowPlayingItem = (obj: NowPlaying): SpotifyTrack => obj?.item ?? {} as SpotifyTrack;

export const getTrackLength = (obj: NowPlaying): number | undefined => obj?.item?.duration_ms;

export const getNowPlayingAlbum = (obj: NowPlaying): SpotifyAlbum => obj?.item?.album ?? {} as SpotifyAlbum;

export const getTrackImages = (obj: NowPlaying): SpotifyImage[] => obj?.item?.album?.images ?? [];

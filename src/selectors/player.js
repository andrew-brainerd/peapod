export const getIsPlaying = obj => obj?.is_playing;

export const getTrackProgress = obj => obj?.progress_ms;

export const getNowPlayingItem = obj => obj?.item ?? {};

export const getTrackLength = obj => obj?.item?.duration_ms;

export const getNowPlayingAlbum = obj => obj?.item?.album ?? {};

export const getTrackImages = obj => obj?.item?.album?.images ?? [];

import {
  LOADING_ALBUMS,
  ALBUMS_LOADED,
  LOADING_TRACKS,
  TRACKS_LOADED
} from '../actions/spotify';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isLoadingAlbums: false,
  isLoadingTracks: false,
  albums: [],
  tracks: []
};

export default function spotify (state = initialState, action) {
  switch (action.type) {
    case LOADING_ALBUMS:
      return {
        ...state,
        isLoadingAlbums: true
      };
    case ALBUMS_LOADED:
      return {
        ...state,
        isLoadingAlbums: false,
        albums: action.albums
      };
    case LOADING_TRACKS:
      return {
        ...state,
        isLoadingTracks: true
      };
    case TRACKS_LOADED:
      return {
        ...state,
        isLoadingTracks: false,
        tracks: action.tracks
      };
    default:
      return state;
  }
}

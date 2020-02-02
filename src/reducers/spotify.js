import {
  SET_AUTH,
  LOADING_PROFILE,
  PROFILE_LOADED,
  LOADING_ARTISTS,
  ARTISTS_LOADED,
  LOADING_ALBUMS,
  ALBUMS_LOADED,
  LOADING_TRACKS,
  TRACKS_LOADED,
  LOADING_DEVICES,
  DEVICES_LOADED,
  LOADING_NOW_PLAYING,
  NOW_PLAYING_LOADED,
  LOADING_SEARCH_RESULTS,
  SEARCH_RESULTS_LOADED
} from '../actions/spotify';

const initialState = {
  accessToken: null,
  refreshToken: null,
  expireTime: null,
  isLoadingDevices: false,
  isLoadingAlbums: false,
  isLoadingTracks: false,
  isLoadingNowPlaying: false,
  profile: null,
  devices: [],
  artists: [],
  albums: [],
  tracks: [],
  nowPlaying: {}
};

export default function spotify (state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        expireTime: action.expireTime
      };
    case LOADING_PROFILE:
      return {
        ...state,
        isLoadingProfile: true
      };
    case PROFILE_LOADED:
      return {
        ...state,
        isLoadingProfile: false,
        profile: action.profile
      };
    case LOADING_ARTISTS:
      return {
        ...state,
        isLoadingAlbums: true
      };
    case ARTISTS_LOADED:
      return {
        ...state,
        isLoadingAlbums: false,
        albums: action.albums
      };
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
    case LOADING_SEARCH_RESULTS:
      return {
        ...state,
        isSearching: true
      };
    case SEARCH_RESULTS_LOADED:
      return {
        ...state,
        isSearching: false
      };
    case LOADING_DEVICES:
      return {
        ...state,
        isLoadingDevices: true
      };
    case DEVICES_LOADED:
      return {
        ...state,
        isLoadingDevices: false,
        devices: action.devices
      };
    case LOADING_NOW_PLAYING:
      return {
        ...state,
        isLoadingNowPlaying: true
      };
    case NOW_PLAYING_LOADED:
      return {
        ...state,
        isLoadingNowPlaying: false,
        nowPlaying: action.nowPlaying
      };
    default:
      return state;
  }
}

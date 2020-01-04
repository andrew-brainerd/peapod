import {
  LOADING_ALBUMS,
  ALBUMS_LOADED
} from '../actions/spotify';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isLoadingAlbums: false,
  albums: []
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
    default:
      return state;
  }
}

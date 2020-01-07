import React, { useEffect } from 'react';
import { bool, array, string, oneOf, func } from 'prop-types';
import { getAuth } from '../../api/spotify';
import { podViews, SEARCH } from '../../constants/pods';
import TrackList from './TrackList/container';
import Player from './Player/container';

const Spotify = ({ hasAuth, pathname, selectedView }) => {
  useEffect(() => {
    !hasAuth && getAuth(pathname);
  }, [hasAuth, pathname]);

  return selectedView === SEARCH ?
    <TrackList /> :
    <Player />;
};

Spotify.propTypes = {
  hasAuth: bool,
  isLoading: bool,
  tracks: array,
  pathname: string,
  selectedView: oneOf(podViews),
  getMyTopTracks: func.isRequired
};

Spotify.defaultProps = {
  isLoading: true
};

export default Spotify;

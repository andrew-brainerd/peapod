import React, { useEffect } from 'react';
import { bool, array, func } from 'prop-types';
import { isEmpty, uniqBy } from 'ramda';
import { getAuth } from '../../api/spotify';
import Track from './Track/Track';
import styles from './Spotify.module.scss';

const Spotify = ({ hasAuth, isLoading, tracks, getMyTopTracks }) => {
  useEffect(() => {
    hasAuth ? getMyTopTracks() : getAuth();
  }, [hasAuth, getMyTopTracks]);

  return isLoading ?
    <div className={styles.loading}>Loading Your Top Tracks...</div> :
    <div className={styles.spotify}>
      {!isEmpty(tracks) &&
        <>
          <h1>Your Top {tracks.length} Tracks</h1>
          <div className={styles.topTracks}>
            {uniqBy(track => track.name, tracks)
              .map((track, t) => <Track key={t} {...track} />)}
          </div>
        </>
      }
    </div>;
};

Spotify.propTypes = {
  hasAuth: bool,
  isLoading: bool,
  tracks: array,
  getMyTopTracks: func.isRequired
};

Spotify.defaultProps = {
  isLoading: true
};

export default Spotify;

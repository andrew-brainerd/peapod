import React, { useEffect } from 'react';
import { bool, array, string, func } from 'prop-types';
import { isEmpty, uniqBy } from 'ramda';
import { getAuth } from '../../api/spotify';
import Track from './Track/Track';
import styles from './Spotify.module.scss';

const Spotify = ({ hasAuth, isLoading, tracks, pathname, getMyTopTracks }) => {
  useEffect(() => {
    hasAuth ? getMyTopTracks() : getAuth(pathname);
  }, [hasAuth, getMyTopTracks, pathname]);

  return isLoading ?
    <div className={styles.loading}>Loading Your Top Tracks...</div> :
    <div className={styles.spotify}>
      {!isEmpty(tracks) &&
        <>
          <div className={styles.trackHeader}>Your Top {tracks.length} Tracks</div>
          <div className={styles.trackList}>
            <div className={styles.topTracks}>
              {uniqBy(track => track.name, tracks)
                .map((track, t) => <Track key={t} {...track} />)}
            </div>
          </div>
        </>
      }
    </div>;
};

Spotify.propTypes = {
  hasAuth: bool,
  isLoading: bool,
  tracks: array,
  pathname: string,
  getMyTopTracks: func.isRequired
};

Spotify.defaultProps = {
  isLoading: true
};

export default Spotify;

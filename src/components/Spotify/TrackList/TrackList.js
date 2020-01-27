import React, { useEffect } from 'react';
import { bool, array, func } from 'prop-types';
import { isEmpty, uniqBy } from 'ramda';
import Track from '../Track/Track';
import styles from './TrackList.module.scss';

const TrackList = ({ hasAuth, isLoading, tracks, getMyTopTracks }) => {
  useEffect(() => {
    hasAuth && getMyTopTracks();
  }, [hasAuth, getMyTopTracks]);

  return isLoading || !hasAuth ?
    <div className={styles.loading}>Loading Tracks...</div> :
    <div className={styles.trackList}>
      {!isEmpty(tracks) &&
        <>
          <div className={styles.list}>
            <div className={styles.tracks}>
              {uniqBy(track => track.name, tracks)
                .map((track, t) => <Track key={t} {...track} />)}
            </div>
          </div>
        </>
      }
    </div>;
};

TrackList.propTypes = {
  hasAuth: bool,
  isLoading: bool,
  tracks: array,
  getMyTopTracks: func.isRequired
};

TrackList.defaultProps = {
  isLoading: true
};

export default TrackList;

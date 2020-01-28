import React, { useState } from 'react';
import { bool, array } from 'prop-types';
import { isEmpty, uniqBy } from 'ramda';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import Track from '../Track/Track';
import styles from './TrackList.module.scss';

const TrackList = ({ hasAuth, isLoading, tracks }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  return isLoading || !hasAuth ?
    <div className={styles.loading}>Loading Tracks...</div> :
    <>
      <div className={styles.trackList}>
        {!isEmpty(tracks) &&
          <>
            <div className={styles.list}>
              <div className={styles.tracks}>
                {uniqBy(track => track.name, tracks)
                  .map((track, t) =>
                    <Track
                      key={t}
                      onClick={() => {
                        setSelectedTrack(track);
                        setIsModalOpen(true);
                      }}
                      {...track}
                    />
                  )}
              </div>
            </div>
          </>
        }
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={() => {
          setIsPlayingPreview(false);
          setIsModalOpen(false);
        }}
        contentClassName={styles.trackModal}
      >
        <div className={styles.viewTrack}>
          <div className={styles.songName}>
            {(selectedTrack || {}).name}
          </div>
          {isPlayingPreview &&
            <div className={styles.preview}>
              <audio autoPlay src={(selectedTrack || {}).preview_url} />
            </div>
          }
          <Button
            className={styles.queueButton}
            text={isPlayingPreview ? 'Stop Preview': 'Play Preview'}
            onClick={() => {
              if (isPlayingPreview) {
                console.log('Stopping Preview');
                setIsPlayingPreview(false);
              } else {
                console.log('Previewing Song...');
                setIsPlayingPreview(true);
              }
            }}
          />
          <Button
            className={styles.queueButton}
            text={'Add to Queue'}
            onClick={() => {
              console.log('Queueing Song...');
            }}
          />
        </div>
      </Modal>
    </>;
};

TrackList.propTypes = {
  hasAuth: bool,
  isLoading: bool,
  tracks: array
};

TrackList.defaultProps = {
  isLoading: true
};

export default TrackList;

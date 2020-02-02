import React, { useState } from 'react';
import { bool, array } from 'prop-types';
import { isEmpty, uniqBy } from 'ramda';
import Modal from '../../common/Modal/Modal';
import Controls from '../Player/Controls/container';
import Track from '../Track/Track';
import styles from './TrackList.module.scss';

const TrackList = ({ hasAuth, isLoading, tracks }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  !!selectedTrack && console.log(selectedTrack);

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
        className={styles.trackModal}
        isOpen={isModalOpen}
        closeModal={() => {
          setIsPlayingPreview(false);
          setIsModalOpen(false);
        }}
        contentClassName={styles.trackModalContent}
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
          <Controls
            className={styles.previewControls}
            isPlaying={isPlayingPreview}
            play={() => setIsPlayingPreview(true)}
            pause={() => setIsPlayingPreview(false)}
            selectedTrack={selectedTrack}
            options={{ canQueue: true }}
            onAddToQueue={() => setIsModalOpen(false)}
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

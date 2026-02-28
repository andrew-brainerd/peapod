import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAccessToken, getIsLoadingTracks, getTracks } from '../../../slices/spotify';
import Modal from '../../common/Modal/Modal';
import Controls from '../Player/Controls/Controls';
import Track from '../Track/Track';
import styles from './TrackList.module.scss';

const TrackList = () => {
  const hasAuth = !!useSelector(getAccessToken);
  const isLoading = useSelector(getIsLoadingTracks);
  const tracks = useSelector(getTracks);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  !!selectedTrack && console.log(selectedTrack);

  return isLoading || !hasAuth ?
    <div className={styles.loading}>Loading Tracks...</div> :
    <>
      <div className={styles.trackList}>
        {tracks?.length > 0 &&
          <>
            <div className={styles.list}>
              <div className={styles.tracks}>
                {[...new Map(tracks.map(t => [t.name, t])).values()]
                  .map((track, t) =>
                    <Track
                      key={t}
                      className={styles.track}
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
            onPlay={() => setIsPlayingPreview(true)}
            onPause={() => setIsPlayingPreview(false)}
            selectedTrack={selectedTrack}
            options={{ canQueue: true }}
            onAddToQueue={() => setIsModalOpen(false)}
          />
        </div>
      </Modal>
    </>;
};

export default TrackList;

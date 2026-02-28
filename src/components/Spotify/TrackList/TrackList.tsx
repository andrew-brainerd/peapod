import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAccessToken, getIsLoadingTracks, getTracks } from '../../../slices/spotify';
import type { SpotifyTrack } from '../../../types';
import Modal from '../../common/Modal/Modal';
import Controls from '../Player/Controls/Controls';
import Track from '../Track/Track';
import styles from './TrackList.module.scss';

const TrackList = () => {
  const hasAuth = !!useSelector(getAccessToken);
  const isLoading = useSelector(getIsLoadingTracks);
  const tracks = useSelector(getTracks) as SpotifyTrack[];
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);
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
                {[...new Map(tracks.map((t: SpotifyTrack) => [t.name, t])).values()]
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
            {(selectedTrack || {} as SpotifyTrack).name}
          </div>
          {isPlayingPreview &&
            <div className={styles.preview}>
              <audio autoPlay src={(selectedTrack || {} as SpotifyTrack).preview_url || undefined} />
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

import React from 'react';
import { useSelector } from 'react-redux';
import { getAccessToken } from '../../../../slices/spotify';
import { useProfile } from '../../../../queries/spotify';
import { usePod } from '../../../../queries/pods';
import { usePlayMutation } from '../../../../queries/spotify';
import type { SpotifyTrack } from '../../../../types';
import Button from '../../../common/Button/Button';
import Track from '../../../Spotify/Track/Track';
import styles from './PlayQueue.module.scss';

interface PlayQueueProps {
  height?: number;
  currentTrack?: SpotifyTrack;
  podId?: string;
}

const PlayQueue = ({ height = 0, currentTrack, podId }: PlayQueueProps) => {
  const accessToken = useSelector(getAccessToken);
  const { data: profile } = useProfile(accessToken);
  const userId = profile?.id;
  const { data: pod } = usePod(podId);
  const playMutation = usePlayMutation(accessToken);
  const PLAYLIST_PADDING = 200;

  const queue = pod?.queue ?? [];
  const isPodOwner = !!pod?.createdBy && !!userId && pod.createdBy.id === userId;
  const playUris = queue.map(({ uri }: SpotifyTrack) => uri);

  return (
    <div className={styles.playQueue} style={{ height: height - PLAYLIST_PADDING }}>
      {isPodOwner && (
        <Button
          className={styles.startButton}
          text={'Start Playing Queue'}
          onClick={() => playMutation.mutate({ uris: playUris })}
          disabled={!queue.length}
        />
      )}
      <div className={styles.trackList}>
        {[...queue].reverse().map((track: SpotifyTrack, t: number) => {
          return (
            (currentTrack || ({} as SpotifyTrack)).name !== track.name && (
              <Track key={t} className={styles.track} {...track} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default PlayQueue;

import React from 'react';
import { useSpotifyStore } from '../../../../stores/spotifyStore';
import { useProfile } from '../../../../queries/spotify';
import { usePod } from '../../../../queries/pods';
import { usePlayMutation } from '../../../../queries/spotify';
import type { SpotifyTrack } from '../../../../types';
import Button from '../../../common/Button/Button';
import Track from '../../../Spotify/Track/Track';
import styles from './PlayQueue.module.scss';

interface PlayQueueProps {
  podId?: string;
}

const PlayQueue = ({ podId }: PlayQueueProps) => {
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const { data: profile } = useProfile(accessToken);
  const userId = profile?.id;
  const { data: pod } = usePod(podId);
  const playMutation = usePlayMutation();

  const queue = pod?.queue ?? [];
  const isPodOwner = !!pod?.createdBy && !!userId && pod.createdBy.id === userId;
  const playUris = queue.map(({ uri }: SpotifyTrack) => uri);

  return (
    <div className={styles.playQueue}>
      {isPodOwner && (
        <Button
          className={styles.startButton}
          text={'Start Playing Queue'}
          onClick={() => playMutation.mutate({ uris: playUris })}
          disabled={!queue.length}
        />
      )}
      <div className={styles.trackList}>
        {[...queue].reverse().map((track: SpotifyTrack, t: number) => (
          <Track key={t} className={styles.track} {...track} />
        ))}
      </div>
    </div>
  );
};

export default PlayQueue;

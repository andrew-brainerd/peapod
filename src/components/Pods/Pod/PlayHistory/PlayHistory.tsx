import React from 'react';
import { usePod } from '../../../../queries/pods';
import type { SpotifyTrack } from '../../../../types';
import Track from '../../../Spotify/Track/Track';

interface PlayHistoryProps {
  podId?: string;
}

const PlayHistory = ({ podId }: PlayHistoryProps) => {
  const { data: pod } = usePod(podId);
  const history = pod?.history ?? [];

  return (
    <div className="m-5 overflow-y-auto">
      <div>
        {[...history].reverse().map((track: SpotifyTrack, t: number) => (
          <Track key={t} className="bg-gray-85 rounded-[5px] mx-auto my-2.5 p-[15px]" {...track} />
        ))}
      </div>
    </div>
  );
};

export default PlayHistory;

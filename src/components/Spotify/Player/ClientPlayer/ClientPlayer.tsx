import React from 'react';
import TrackProgress from '../TrackProgress/TrackProgress';
import Loading from '../../../common/Loading/Loading';
import type { NowPlaying } from '../../../../types';

interface ClientPlayerProps {
  height?: number;
  isPlaying?: boolean;
  trackName?: string;
  nowPlaying?: NowPlaying;
  albumArt?: string;
}

const ClientPlayer = ({ height, isPlaying, trackName, nowPlaying, albumArt }: ClientPlayerProps) => {
  return (
    <div className="bg-gray-80 rounded-[10px] text-[16px] mx-auto my-[15px] max-w-[750px] overflow-hidden w-[95%]" style={{ height }}>
      {isPlaying ? (
        <div className="flex items-center text-[1.5em] p-[25px] relative">
          <div className="flex-[3]">
            <div className="text-[1.5em] mb-[25px]">{trackName}</div>
            <TrackProgress nowPlaying={nowPlaying} />
          </div>
          <div className="flex-1">
            <img className="w-[100px]" src={albumArt} alt={'Album Art'} />
          </div>
        </div>
      ) : (
        <div className="flex items-center text-[3em] h-[150px] justify-center">
          <Loading altText={'Loading Now Playing...'} />
        </div>
      )}
    </div>
  );
};

export default ClientPlayer;

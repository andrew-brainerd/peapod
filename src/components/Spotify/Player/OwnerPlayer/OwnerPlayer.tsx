import React from 'react';
import TrackProgress from '../TrackProgress/TrackProgress';
import Controls from '../Controls/Controls';
import Devices from '../../Devices/Devices';
import PodMembers from '../../../Pods/Pod/PodMembers/PodMembers';
import type { NowPlaying } from '../../../../types';

interface OwnerPlayerProps {
  isPlaying?: boolean;
  trackName?: string;
  nowPlaying?: NowPlaying;
  albumArt?: string;
}

const OwnerPlayer = ({ isPlaying, trackName, nowPlaying, albumArt }: OwnerPlayerProps) => {
  return (
    <div className="bg-gray-80 rounded-[10px] text-[16px] mx-auto my-[15px] max-w-[750px] overflow-hidden w-[95%]">
      {isPlaying ? (
        <div className="flex items-center border-b-[15px] border-primary text-[1.5em] p-[25px] relative">
          <div className="flex-[3]">
            <div className="text-[1.5em] mb-[25px]">{trackName}</div>
            <TrackProgress nowPlaying={nowPlaying} />
          </div>
          <Controls className="!bg-transparent" isPlaying={isPlaying} />
          <div className="flex-1">
            <img className="w-[100px]" src={albumArt} alt={'Album Art'} />
          </div>
        </div>
      ) : (
        <div className="flex items-center border-b-[15px] border-primary text-[3em] h-[150px] justify-center">
          <Controls isPlaying={isPlaying} />
        </div>
      )}
      <div className="flex justify-evenly">
        <Devices />
        <PodMembers />
      </div>
    </div>
  );
};

export default OwnerPlayer;

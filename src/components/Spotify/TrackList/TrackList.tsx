import React, { useState } from 'react';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import { useSearch } from '../../../queries/spotify';
import useDebounce from '../../../hooks/useDebounce';
import type { SpotifyTrack } from '../../../types';
import Modal from '../../common/Modal/Modal';
import Controls from '../Player/Controls/Controls';
import Track from '../Track/Track';

interface TrackListProps {
  searchText?: string;
}

const TrackList = ({ searchText = '' }: TrackListProps) => {
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const debouncedSearchText = useDebounce(searchText, 500);
  const { data: tracks = [], isLoading } = useSearch(accessToken, debouncedSearchText);
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  !!selectedTrack && console.log(selectedTrack);

  return isLoading || !accessToken ? (
    <div className="text-[1.5em] mt-[30px] text-center">Loading Tracks...</div>
  ) : (
    <>
      <div className="h-[97%] mx-auto my-[15px] max-w-[700px] overflow-y-auto w-[95%]">
        {(tracks as SpotifyTrack[])?.length > 0 && (
          <>
            <div>
              <div className="h-[85%] m-2.5 overflow-y-auto">
                {[...new Map((tracks as SpotifyTrack[]).map((t: SpotifyTrack) => [t.name, t])).values()].map(
                  (track, t) => (
                    <Track
                      key={t}
                      onClick={() => {
                        setSelectedTrack(track);
                        setIsModalOpen(true);
                      }}
                      {...track}
                    />
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Modal
        className="!h-[200px]"
        isOpen={isModalOpen}
        closeModal={() => {
          setIsPlayingPreview(false);
          setIsModalOpen(false);
        }}
        contentClassName="!flex !justify-center"
      >
        <div className="text-[2em] w-[95%]">
          <div className="text-peapod mx-auto mb-5 overflow-hidden text-center text-ellipsis select-none whitespace-nowrap w-[95%]">{(selectedTrack || ({} as SpotifyTrack)).name}</div>
          {isPlayingPreview && (
            <div>
              <audio autoPlay src={(selectedTrack || ({} as SpotifyTrack)).preview_url || undefined} />
            </div>
          )}
          <Controls
            className="!flex !justify-center"
            isPlaying={isPlayingPreview}
            onPlay={() => setIsPlayingPreview(true)}
            onPause={() => setIsPlayingPreview(false)}
            selectedTrack={selectedTrack}
            options={{ canQueue: true }}
            onAddToQueue={() => setIsModalOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
};

export default TrackList;

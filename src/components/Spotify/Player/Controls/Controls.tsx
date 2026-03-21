import React from 'react';
import { useParams } from '@tanstack/react-router';
import { usePlayMutation, usePauseMutation } from '../../../../queries/spotify';
import { useAddToQueueMutation } from '../../../../queries/pods';
import noop from '../../../../utils/noop';
import Icon from '../../../common/Icon/Icon';
import type { SpotifyTrack, ControlsOptions } from '../../../../types';

interface ControlsProps {
  className?: string;
  isPlaying?: boolean;
  options?: ControlsOptions;
  selectedTrack?: SpotifyTrack | null;
  onPlay?: () => void;
  onPause?: () => void;
  onAddToQueue?: () => void;
}

const Controls = ({
  className,
  isPlaying,
  options,
  selectedTrack,
  onPlay,
  onPause,
  onAddToQueue
}: ControlsProps) => {
  const { podId } = useParams({ strict: false }) as { podId?: string };
  const playMutation = usePlayMutation();
  const pauseMutation = usePauseMutation();
  const addToQueue = useAddToQueueMutation(podId);
  const { canPlay = true, canPause = true, canQueue } = options || {};

  return (
    <div className={`flex bg-btn rounded-[15px] justify-center mx-auto w-[200px] [&_svg]:cursor-pointer [&_svg]:fill-text-primary [&_svg]:h-[50px] [&_svg]:m-2.5 [&_svg]:transition-[fill] [&_svg]:duration-300 [&_svg]:w-[30px] [&_svg:hover]:fill-peapod ${className || ''}`}>
      {isPlaying
        ? canPause && <Icon name={'pause'} onClick={onPause || (() => pauseMutation.mutate())} />
        : canPlay && <Icon name={'play'} onClick={onPlay || (() => playMutation.mutate(undefined))} />}
      {canQueue && !!selectedTrack && (
        <Icon
          name={'add'}
          title={'Add Track to Queue'}
          onClick={() => {
            addToQueue.mutate(selectedTrack);
            onAddToQueue ? onAddToQueue() : noop();
          }}
        />
      )}
    </div>
  );
};

export default Controls;

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from '@tanstack/react-router';
import { getAccessToken } from '../../../../slices/spotify';
import { usePlayMutation, usePauseMutation } from '../../../../queries/spotify';
import { useAddToQueueMutation } from '../../../../queries/pods';
import noop from '../../../../utils/noop';
import Icon from '../../../common/Icon/Icon';
import type { SpotifyTrack, ControlsOptions } from '../../../../types';
import styles from './Controls.module.scss';

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
  const accessToken = useSelector(getAccessToken);
  const { podId } = useParams({ strict: false }) as { podId?: string };
  const playMutation = usePlayMutation(accessToken);
  const pauseMutation = usePauseMutation(accessToken);
  const addToQueue = useAddToQueueMutation(podId);
  const { canPlay = true, canPause = true, canQueue } = options || {};

  return (
    <div className={[styles.controls, className].join(' ')}>
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

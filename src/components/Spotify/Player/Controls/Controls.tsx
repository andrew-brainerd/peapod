import React from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../store/configureStore';
import { play, pause } from '../../../../slices/spotify';
import { addTrackToPlayQueue } from '../../../../slices/pods';
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
  const dispatch = useDispatch<AppDispatch>();
  const { canPlay = true, canPause = true, canQueue } = options || {};

  return (
    <div className={[styles.controls, className].join(' ')}>
      {isPlaying ?
        canPause && <Icon name={'pause'} onClick={onPause || (() => dispatch(pause()))} /> :
        canPlay && <Icon name={'play'} onClick={onPlay || (() => dispatch(play()))} />
      }
      {canQueue && !!selectedTrack &&
        <Icon
          name={'add'}
          title={'Add Track to Queue'}
          onClick={() => {
            dispatch(addTrackToPlayQueue(selectedTrack));
            onAddToQueue ? onAddToQueue() : noop();
          }}
        />
      }
    </div>
  );
};

export default Controls;

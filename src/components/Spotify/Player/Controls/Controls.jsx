import React from 'react';
import { string, bool, shape, object, func } from 'prop-types';
import { useDispatch } from 'react-redux';
import { play, pause } from '../../../../slices/spotify';
import { addTrackToPlayQueue } from '../../../../slices/pods';
import noop from '../../../../utils/noop';
import Icon from '../../../common/Icon/Icon';
import styles from './Controls.module.scss';

const Controls = ({
  className,
  isPlaying,
  options,
  selectedTrack,
  onPlay,
  onPause,
  onAddToQueue
}) => {
  const dispatch = useDispatch();
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

Controls.propTypes = {
  className: string,
  isPlaying: bool,
  options: shape({
    canPlay: bool,
    canPause: bool,
    canQueue: bool
  }),
  selectedTrack: object,
  onPlay: func,
  onPause: func,
  onAddToQueue: func
};

export default Controls;

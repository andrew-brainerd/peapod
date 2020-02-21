import React from 'react';
import { string, bool, shape, object, func } from 'prop-types';
import noop from '../../../../utils/noop';
import Icon from '../../../common/Icon/Icon';
import styles from './Controls.module.scss';

const Controls = ({
  className,
  isPlaying,
  options,
  selectedTrack,
  play,
  pause,
  onPlay,
  onPause,
  addToQueue,
  onAddToQueue
}) => {
  const { canPlay = true, canPause = true, canQueue } = options || {};

  return (
    <div className={[styles.controls, className].join(' ')}>
      {isPlaying ?
        canPause && <Icon name={'pause'} onClick={onPause || pause} /> :
        canPlay && <Icon name={'play'} onClick={onPlay || play} />
      }
      {canQueue && !!selectedTrack &&
        <Icon
          name={'add'}
          title={'Add Track to Queue'}
          onClick={() => {
            addToQueue(selectedTrack);
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
  play: func.isRequired,
  pause: func.isRequired,
  onPlay: func,
  onPause: func,
  addToQueue: func.isRequired,
  onAddToQueue: func
};

export default Controls;

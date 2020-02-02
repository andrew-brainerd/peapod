import React from 'react';
import { string, bool, shape, object, func } from 'prop-types';
import noop from '../../../../utils/noop';
import { ReactComponent as PlayButton } from '../../../../img/play.svg';
import { ReactComponent as PauseButton } from '../../../../img/pause.svg';
import { ReactComponent as QueueButton } from '../../../../img/add.svg';
import styles from './Controls.module.scss';

const Controls = ({
  className,
  isPlaying,
  options,
  selectedTrack,
  play,
  pause,
  addToQueue,
  onAddToQueue
}) => {
  const { canPlay = true, canPause = true, canQueue } = options || {};

  return (
    <div className={[styles.controls, className].join(' ')}>
      {isPlaying ?
        canPause && <PauseButton onClick={pause} /> :
        canPlay && <PlayButton onClick={() => play()} />
      }
      {canQueue && !!selectedTrack &&
        <QueueButton
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
  addToQueue: func.isRequired,
  onAddToQueue: func
};

export default Controls;

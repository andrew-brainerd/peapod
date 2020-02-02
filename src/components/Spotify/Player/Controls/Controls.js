import React from 'react';
import { string, bool, shape, func } from 'prop-types';
import { ReactComponent as PlayButton } from '../../../../img/play.svg';
import { ReactComponent as PauseButton } from '../../../../img/pause.svg';
import { ReactComponent as QueueButton } from '../../../../img/add.svg';
import styles from './Controls.module.scss';

const Controls = ({ className, isPlaying, options, play, pause }) => {
  const { canPlay = true, canPause = true, canQueue } = options || {};

  return (
    <div className={[styles.controls, className].join(' ')}>
      {isPlaying ?
        canPause && <PauseButton onClick={pause} /> :
        canPlay && <PlayButton onClick={() => play()} />
      }
      {canQueue &&
        <QueueButton
          onClick={() => {
            console.log('Queueing Song...');
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
  play: func.isRequired,
  pause: func.isRequired
};

export default Controls;

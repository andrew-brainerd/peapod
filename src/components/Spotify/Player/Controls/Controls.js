import React from 'react';
import { bool, func } from 'prop-types';
import { ReactComponent as PlayButton } from '../../../../img/play.svg';
import { ReactComponent as PauseButton } from '../../../../img/pause.svg';
import styles from './Controls.module.scss';

const Controls = ({ isPlaying, play, pause }) => {
  return (
    <div className={styles.controls}>
      {isPlaying ?
        <PauseButton
          className={styles.pause}
          onClick={pause}
        /> :
        <PlayButton
          className={styles.play}
          onClick={() => play()}
        />
      }
    </div>
  );
};

Controls.propTypes = {
  isPlaying: bool,
  play: func.isRequired,
  pause: func.isRequired
};

export default Controls;

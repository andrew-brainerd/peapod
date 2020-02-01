import React from 'react';
import { func } from 'prop-types';
import Button from '../../../common/Button/Button';
import styles from './Controls.module.scss';

const Controls = ({ play, pause }) => {
  return (
    <div className={styles.controls}>
      <Button
        className={styles.play}
        text={'>'}
        onClick={() => play()}
      />
      <Button
        className={styles.play}
        text={'||'}
        onClick={pause}
      />
    </div>
  );
};

Controls.propTypes = {
  play: func.isRequired,
  pause: func.isRequired
};

export default Controls;

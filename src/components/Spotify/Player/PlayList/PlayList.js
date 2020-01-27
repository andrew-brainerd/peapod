import React from 'react';
import { array } from 'prop-types';
import Track from '../../Track/Track';
import styles from './PlayList.module.scss';

const PlayList = ({ tracks }) => {
  return (
    <div className={styles.playList}>
      {tracks.map((track, t) => <Track key={t} {...track} />)}
    </div>
  );
};

PlayList.propTypes = {
  tracks: array
};

export default PlayList;

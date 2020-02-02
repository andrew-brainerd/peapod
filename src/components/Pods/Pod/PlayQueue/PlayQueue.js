import React from 'react';
import { object, func } from 'prop-types';
import { isEmpty } from 'ramda';
import usePollingEffect from '../../../../hooks/usePollingEffect';
import styles from './PlayQueue';

const PlayQueue = ({ queue, getQueue }) => {
  usePollingEffect(() => {
    // getQueue();
  }, [getQueue], 7500);

  !isEmpty(queue) && console.log(`Play Queue: %o`, queue);

  return (
    <div className={styles.playQueue}>
      <h1>Play Queue</h1>
    </div>
  );
};

PlayQueue.propTypes = {
  queue: object,
  getQueue: func
};

export default PlayQueue;

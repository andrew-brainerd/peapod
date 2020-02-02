import React from 'react';
import { object, func } from 'prop-types';
import { isEmpty } from 'ramda';
import usePollingEffect from '../../../../hooks/usePollingEffect';
import styles from './PlayHistory.module.scss';

const PlayHistory = ({ history, getHistory }) => {
  usePollingEffect(() => {
    // getHistory();
  }, [getHistory], 7500);

  !isEmpty(history) && console.log(`Play History: %o`, history);

  return (
    <div className={styles.playHistory}>
      <h1>Play History</h1>
    </div>
  );
};

PlayHistory.propTypes = {
  history: object,
  getHistory: func
};

export default PlayHistory;

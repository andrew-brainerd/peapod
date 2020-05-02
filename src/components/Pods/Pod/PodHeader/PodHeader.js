import React from 'react';
import { string, func } from 'prop-types';
import PodViewSelector from '../PodViewSelector/container';
import styles from './PodHeader.module.scss';

const PodHeader = ({ podId, view }) => {
  return (
    <div className={styles.podHeader}>
      <PodViewSelector
        className={styles.viewSelector}
        podId={podId}
        selectedView={view}
      />
    </div>
  );
};

PodHeader.propTypes = {
  podId: string,
  podName: string,
  userId: string,
  view: string,
  navTo: func.isRequired
};

export default PodHeader;

import React from 'react';
import PodViewSelector from '../PodViewSelector/PodViewSelector';
import styles from './PodHeader.module.scss';

interface PodHeaderProps {
  podId?: string;
  podName?: string;
  userId?: string;
  view?: string;
}

const PodHeader = ({ podId, view }: PodHeaderProps) => {
  return (
    <div className={styles.podHeader}>
      <PodViewSelector
        className={styles.viewSelector}
        podId={podId}
        selectedView={view!}
      />
    </div>
  );
};

export default PodHeader;

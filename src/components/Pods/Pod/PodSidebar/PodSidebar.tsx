import React, { useState } from 'react';
import PlayQueue from '../PlayQueue/PlayQueue';
import PlayHistory from '../PlayHistory/PlayHistory';
import styles from './PodSidebar.module.scss';

type SidebarTab = 'queue' | 'history';

interface PodSidebarProps {
  podId?: string;
}

const PodSidebar = ({ podId }: PodSidebarProps) => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('queue');

  return (
    <div className={styles.sidebar}>
      <div className={styles.tabs}>
        <button
          className={[styles.tab, activeTab === 'queue' ? styles.active : ''].join(' ')}
          onClick={() => setActiveTab('queue')}
        >
          Queue
        </button>
        <button
          className={[styles.tab, activeTab === 'history' ? styles.active : ''].join(' ')}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>
      <div className={styles.tabContent}>
        {activeTab === 'queue' ? <PlayQueue podId={podId} /> : <PlayHistory podId={podId} />}
      </div>
    </div>
  );
};

export default PodSidebar;

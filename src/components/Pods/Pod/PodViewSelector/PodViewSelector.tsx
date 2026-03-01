import React, { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { NOW_PLAYING } from '../../../../constants/pods';
import Icon from '../../../common/Icon/Icon';
import styles from './PodViewSelector.module.scss';

const podViewItems = [
  { key: 'search', name: 'Search', path: '/search' },
  { key: 'nowPlaying', name: 'Now Playing', path: '/player' },
  { key: 'queue', name: 'Queue', path: '/queue' },
  { key: 'history', name: 'History', path: '/history' }
] as const;

interface PodViewSelectorProps {
  className?: string;
  podId?: string;
  selectedView: string;
}

const PodViewSelector = ({ className, podId, selectedView }: PodViewSelectorProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={buttonRef}
      className={styles.podViewSelector}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <div className={styles.menuButton}>
        <Icon name={'hamburger'} title={'Menu'} />
      </div>
      <div className={[
        styles.viewSelector,
        className || ''
      ].join(' ')}>
        {podViewItems.map(({ key, name, path }) => (
          <div
            key={name}
            className={[
              styles.view,
              key === NOW_PLAYING ? styles.nowPlaying : '',
              selectedView === key ? styles.selected : ''
            ].join(' ')}
            onClick={() => navigate({
              to: `/pods/$podId${path}`,
              params: { podId: podId || '' }
            })}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodViewSelector;

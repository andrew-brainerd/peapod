import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { podViews, NOW_PLAYING } from '../../../../constants/pods';
import Icon from '../../../common/Icon/Icon';
import styles from './PodViewSelector.module.scss';

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
        {Object.keys(podViews).map(view => {
          const { name, path } = podViews[view as keyof typeof podViews];
          return (
            <div
              key={name}
              className={[
                styles.view,
                view === NOW_PLAYING ? styles.nowPlaying : '',
                selectedView === view ? styles.selected : ''
              ].join(' ')}
              onClick={() => navigate(path.replace(':podId', podId || ''))}
            >
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PodViewSelector;

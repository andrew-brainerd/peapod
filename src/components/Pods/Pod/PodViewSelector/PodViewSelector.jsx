import React, { useState, useRef } from 'react';
import { string } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { podViews, NOW_PLAYING } from '../../../../constants/pods';
import Icon from '../../../common/Icon/Icon';
import styles from './PodViewSelector.module.scss';

const PodViewSelector = ({ className, podId, selectedView }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef();
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
          const { name, path } = podViews[view];
          return (
            <div
              key={name}
              className={[
                styles.view,
                view === NOW_PLAYING ? styles.nowPlaying : '',
                selectedView === view ? styles.selected : ''
              ].join(' ')}
              onClick={() => navigate(path.replace(':podId', podId))}
            >
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

PodViewSelector.propTypes = {
  className: string,
  podId: string,
  selectedView: string.isRequired
};

export default PodViewSelector;

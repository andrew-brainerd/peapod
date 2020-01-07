import React from 'react';
import { string, func } from 'prop-types';
import { podViews } from '../../../../constants/pods';
import styles from './PodViewSelector.module.scss';

const PodViewSelector = ({ selectedView, setView }) => (
  <div className={styles.podViewSelector}>
    {podViews.map(view =>
      <div
        key={view}
        className={[
          styles.view,
          selectedView === view ? styles.selected : ''
        ].join(' ')}
        onClick={() => setView(view)}
      >
        {view}
      </div>
    )}
  </div>
);

PodViewSelector.propTypes = {
  selectedView: string.isRequired,
  setView: func.isRequired
};

export default PodViewSelector;

import React from 'react';
import { string, func } from 'prop-types';
import { keys } from 'ramda';
import { podViews } from '../../../../constants/pods';
import styles from './PodViewSelector.module.scss';

const PodViewSelector = ({ className, podId, selectedView, navTo }) => (
  <div className={[
    styles.podViewSelector,
    className || ''
  ].join(' ')}>
    {keys(podViews).map(view => {
      const { name, path } = podViews[view];
      return (
        <div
          key={name}
          className={[
            styles.view,
            selectedView === view ? styles.selected : ''
          ].join(' ')}
          onClick={() => navTo(path.replace(':podId', podId))}
        >
          {name}
        </div>
      );
    })}
  </div>
);

PodViewSelector.propTypes = {
  className: string,
  selectedView: string.isRequired,
  navTo: func.isRequired
};

export default PodViewSelector;

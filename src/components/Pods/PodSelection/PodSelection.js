import React from 'react';
import { func } from 'prop-types';
import Button from '../../common/Button/Button';
import { CREATE_POD_ROUTE, JOIN_POD_ROUTE } from '../../../constants/routes';
import styles from './PodSelection.module.scss';

const PodSelection = ({ navTo }) => {
  return (
    <div className={styles.podSelection}>
      <Button
        className={styles.podChoice}
        text={'Create New'}
        onClick={() => navTo(CREATE_POD_ROUTE)}
      />
      <Button
        className={styles.podChoice}
        text={'Join Existing'}
        onClick={() => navTo(JOIN_POD_ROUTE)}
      />
    </div>
  );
};

PodSelection.propTypes = {
  navTo: func.isRequired
};

export default PodSelection;

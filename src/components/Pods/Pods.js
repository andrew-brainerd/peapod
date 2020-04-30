import React from 'react';
import { number, bool, func } from 'prop-types';
import Header from '../common/Header/container';
import CreateNewButton from './CreateNewButton/container';
import styles from './Pods.module.scss';

const Pods = ({ height, isLoading, navTo }) => (
  <>
    <Header />
    <div className={styles.pods} style={{ height: height - 100 }}>
      <div className={styles.podList} style={{ height: height - 150 }}>
        {isLoading ?
          <div className={styles.loading}>Loading Pods...</div> :
          <CreateNewButton navTo={navTo} />
        }
      </div>
    </div>
  </>
);

Pods.propTypes = {
  height: number,
  isLoading: bool,
  navTo: func.isRequired
};

export default Pods;

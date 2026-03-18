import React from 'react';
import { usePods } from '../../queries/pods';
import Header from '../common/Header/Header';
import CreateNewButton from './CreateNewButton/CreateNewButton';
import styles from './Pods.module.scss';

const Pods = () => {
  const { isLoading } = usePods();
  const height = window.innerHeight;

  return (
    <>
      <Header />
      <div className={styles.pods} style={{ height: height - 100 }}>
        <div className={styles.podList} style={{ height: height - 150 }}>
          {isLoading ? <div className={styles.loading}>Loading Pods...</div> : <CreateNewButton />}
        </div>
      </div>
    </>
  );
};

export default Pods;

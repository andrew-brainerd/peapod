import React, { useEffect } from 'react';
import { func, array } from 'prop-types';
import Pod from '../../Pod/Pod';
import styles from './JoinPod.module.scss';

const JoinPod = ({ getPods, pods }) => {

  useEffect(() => {
    console.log(`Get Pods`);
    getPods();
  }, [getPods, pods.length]);

  return (
    <div className={styles.joinPod}>
      {(pods || []).map(({ name }, p) => <Pod key={p} name={name} />)}
    </div>
  );
}

JoinPod.propTypes = {
  getPods: func.isRequired,
  pods: array
}

export default JoinPod;

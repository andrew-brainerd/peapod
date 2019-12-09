import React, { useEffect } from 'react';
import { func, array, string } from 'prop-types';
import Pod from './Pod/Pod';
import styles from './Pods.module.scss';

const getName = pod => pod && pod.name;
const getMembers = pod => (pod || {}).members || [];
const getNumMembers = pod => getMembers(pod).length;

const Pods = ({ getMyPods, pods, userId }) => {
  useEffect(() => {
    userId && getMyPods(userId);
  }, [userId, getMyPods]);

  return (
    <div className={styles.pods}>
      <div className={styles.podList}>
        {(pods || []).map((pod, p) =>
          <Pod
            key={p}
            name={getName(pod)}
            numMembers={getNumMembers(pod)}
            action={isOpen => {
              console.log('Pod:', pod);
            }}
          />
        )}
      </div>
    </div>
  );
};

Pods.propTypes = {
  getMyPods: func.isRequired,
  pods: array,
  userId: string
};

export default Pods;

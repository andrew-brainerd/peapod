import React, { useEffect } from 'react';
import { func, array, string } from 'prop-types';
import PodItem from './PodItem/PodItem';
import styles from './Pods.module.scss';
import { POD_ROUTE } from '../../constants/routes';

const getId = pod => (pod || {})._id;
const getName = pod => pod && pod.name;
const getMembers = pod => (pod || {}).members || [];
const getNumMembers = pod => getMembers(pod).length;

const Pods = ({ getMyPods, pods, userId, navTo }) => {
  useEffect(() => {
    userId && getMyPods(userId);
  }, [userId, getMyPods]);

  return (
    <div className={styles.pods}>
      <div className={styles.podList}>
        {(pods || []).map((pod, p) =>
          <PodItem
            key={p}
            name={getName(pod)}
            numMembers={getNumMembers(pod)}
            action={() => navTo(POD_ROUTE.replace(':podId', getId(pod)))}
          />
        )}
      </div>
    </div>
  );
};

Pods.propTypes = {
  getMyPods: func.isRequired,
  pods: array,
  userId: string,
  navTo: func.isRequired
};

export default Pods;

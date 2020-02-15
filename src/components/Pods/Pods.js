import React, { useEffect } from 'react';
import { number, array, string, func } from 'prop-types';
import PodItem from './PodItem/PodItem';
import styles from './Pods.module.scss';
import { POD_SEARCH_ROUTE } from '../../constants/routes';
import { isEmpty } from 'ramda';
import Header from '../common/Header/container';

const getId = pod => (pod || {})._id;
const getName = pod => pod && pod.name;
const getMembers = pod => (pod || {}).members || [];
const getNumMembers = pod => getMembers(pod).length;

const Pods = ({ height, pods, userId, getMyPods, navTo }) => {
  useEffect(() => {
    userId && getMyPods(userId);
  }, [userId, getMyPods]);

  const podHeight = height - 100;

  return (
    <>
      <Header />
      <div className={styles.pods} style={{ height: podHeight }}>
        <div className={styles.podList} style={{ height: podHeight - 50 }}>
          {isEmpty(pods) ?
            <div className={styles.loading}>Loading Pods...</div> :
            (pods || []).map((pod, p) =>
              <PodItem
                key={p}
                name={getName(pod)}
                numMembers={getNumMembers(pod)}
                action={() => navTo(POD_SEARCH_ROUTE.replace(':podId', getId(pod)))}
              />
            )}
        </div>
      </div>
    </>
  );
};

Pods.propTypes = {
  height: number,
  pods: array,
  userId: string,
  getMyPods: func.isRequired,
  navTo: func.isRequired
};

export default Pods;

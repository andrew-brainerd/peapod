import React, { useEffect } from 'react';
import { number, bool, array, string, func } from 'prop-types';
import { isEmpty } from 'ramda';
import { POD_SEARCH_ROUTE } from '../../constants/routes';
import Header from '../common/Header/container';
import CreatNewButton from './CreateNewButton/CreateNewButton';
import PodItem from './PodItem/PodItem';
import styles from './Pods.module.scss';

const getId = pod => (pod || {})._id;
const getName = pod => pod && pod.name;
const getMembers = pod => (pod || {}).members || [];
const getNumMembers = pod => getMembers(pod).length;

const Pods = ({ height, isLoading, pods, userId, getMyPods, navTo }) => {
  useEffect(() => {
    userId && getMyPods(userId);
  }, [userId, getMyPods]);

  const podHeight = height - 100;

  return (
    <>
      <Header />
      <div className={styles.pods} style={{ height: podHeight }}>
        <div className={styles.podList} style={{ height: podHeight - 50 }}>
          {isLoading ?
            <div className={styles.loading}>Loading Pods...</div> :
            isEmpty(pods) ? <CreatNewButton navTo={navTo} /> : (
              <>
                <CreatNewButton navTo={navTo} />
                {(pods || []).map((pod, p) =>
                  <PodItem
                    key={p}
                    name={getName(pod)}
                    numMembers={getNumMembers(pod)}
                    action={() => navTo(POD_SEARCH_ROUTE.replace(':podId', getId(pod)))}
                  />)}
              </>
            )}
        </div>
      </div>
    </>
  );
};

Pods.propTypes = {
  height: number,
  isLoading: bool,
  pods: array,
  userId: string,
  getMyPods: func.isRequired,
  navTo: func.isRequired
};

export default Pods;

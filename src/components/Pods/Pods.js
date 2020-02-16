import React, { useEffect } from 'react';
import { number, array, string, func } from 'prop-types';
import { isEmpty } from 'ramda';
import { POD_SEARCH_ROUTE, CREATE_POD_ROUTE } from '../../constants/routes';
import Header from '../common/Header/container';
import Button from '../common/Button/Button';
import PodItem from './PodItem/PodItem';
import { ReactComponent as NewIcon } from '../../img/add.svg';
import styles from './Pods.module.scss';

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
            <div className={styles.loading}>Loading Pods...</div> : (
              <>
                <Button
                  className={styles.createNew}
                  onClick={() => navTo(CREATE_POD_ROUTE)}
                >
                  <NewIcon />
                </Button>
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
  pods: array,
  userId: string,
  getMyPods: func.isRequired,
  navTo: func.isRequired
};

export default Pods;

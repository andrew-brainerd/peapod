import React, { useState, useEffect } from 'react';
import { func, string, shape, number } from 'prop-types';
import { MY_PODS_ROUTE } from '../../../constants/routes';
import { SEARCH } from '../../../constants/pods';
import Spotify from '../../Spotify/container';
import PodViewSelector from './PodViewSelector/PodViewSelector';
import styles from './Pod.module.scss';

const getPodId = pathname => pathname.split('/')[2];

const Pod = ({ getPod, pathname, pod, userId, height, navTo }) => {
  const [view, setView] = useState(SEARCH);

  useEffect(() => {
    getPod(getPodId(pathname));
  }, [getPod, pathname]);

  const { name } = pod || {};

  return (
    <div className={styles.pod} style={{ height: height - (height * 0.07) }}>
      <div className={styles.header}>
        <h1 className={styles.name}>{name}</h1>
        <PodViewSelector selectedView={view} setView={setView} />
        <div
          className={styles.closeButton}
          title={'Close Pod'}
          onClick={() => navTo(MY_PODS_ROUTE.replace(':userId', userId))}
        />
      </div>
      <div className={styles.content}>
        <Spotify selectedView={view} />
      </div>
    </div>
  );
};

Pod.propTypes = {
  getPod: func.isRequired,
  pathname: string,
  pod: shape({
    name: string
  }),
  userId: string,
  height: number,
  navTo: func.isRequired
};

export default Pod;

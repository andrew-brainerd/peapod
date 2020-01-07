import React, { useEffect } from 'react';
import { func, string, shape } from 'prop-types';
import { MY_PODS_ROUTE } from '../../../constants/routes';
import Spotify from '../../Spotify/container';
import styles from './Pod.module.scss';

const getPodId = pathname => pathname.split('/')[2];

const Pod = ({ getPod, pathname, pod, userId, navTo }) => {
  useEffect(() => {
    getPod(getPodId(pathname));
  }, [getPod, pathname]);

  const { name } = pod || {};

  return (
    <div className={styles.pod}>
      <div className={styles.header}>
        <h1 className={styles.name}>{name}</h1>
        <div
          className={styles.closeButton}
          title={'Close Pod'}
          onClick={() => navTo(MY_PODS_ROUTE.replace(':userId', userId))}
        />
      </div>
      <div className={styles.content}>
        <Spotify />
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
  navTo: func.isRequired
};

export default Pod;

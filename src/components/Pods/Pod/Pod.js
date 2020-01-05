import React, { useEffect } from 'react';
import { func, string, shape } from 'prop-types';
import styles from './Pod.module.scss';

const getPodId = pathname => pathname.split('/')[2];

const Pod = ({ getPod, pathname, pod }) => {
  useEffect(() => {
    getPod(getPodId(pathname));
  }, [getPod, pathname]);

  const { name } = pod || {};

  return (
    <div className={styles.pod}>
      <h1 className={styles.name}>{name}</h1>
    </div>
  );
};

Pod.propTypes = {
  getPod: func.isRequired,
  pathname: string,
  pod: shape({
    name: string
  })
};

export default Pod;

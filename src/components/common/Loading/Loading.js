import React from 'react';
import { bool, string } from 'prop-types';
import loader from '../../../img/loading.png';
import styles from './Loading.module.scss';

const Loading = ({ altText, isLoading }) => {
  return isLoading && (
    <div className={styles.loading}>
      <img src={loader} alt={altText} />
    </div>
  );
};

Loading.propTypes = {
  altText: string.isRequired,
  isLoading: bool
};

export default Loading;

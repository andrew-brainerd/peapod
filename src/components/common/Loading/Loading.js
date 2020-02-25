import React from 'react';
import { bool, string } from 'prop-types';
import Icon from '../../common/Icon/Icon';
import styles from './Loading.module.scss';

const Loading = ({ isActive, title }) => {
  return isActive && (
    <div className={styles.loading}>
      <Icon name={'ripple-purple'} title={title} />
    </div>
  );
};

Loading.propTypes = {
  title: string.isRequired,
  isActive: bool
};

Loading.defaultProps = {
  title: 'Loading...',
  isActive: true
};

export default Loading;

import React from 'react';
import Icon from '../../common/Icon/Icon';
import styles from './Loading.module.scss';

interface LoadingProps {
  title?: string;
  altText?: string;
  isActive?: boolean;
}

const Loading = ({ isActive = true, title = 'Loading...' }: LoadingProps) => {
  return (
    isActive && (
      <div className={styles.loading}>
        <Icon name={'ripple-purple'} title={title} />
      </div>
    )
  );
};

export default Loading;

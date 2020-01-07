import React, { useEffect } from 'react';
import { bool, string } from 'prop-types';
import styles from './Player.module.scss';

const Player = ({ hasAuth, isLoading, pathname }) => {
  useEffect(() => {
    hasAuth && console.log('Ready to Play :D');
  }, [hasAuth]);

  return isLoading || !hasAuth ?
    <div className={styles.loading}>Loading Player...</div> :
    <div className={styles.player}>
      <h1>Player</h1>
    </div>;
};

Player.propTypes = {
  hasAuth: bool,
  isLoading: bool,
  pathname: string
};

Player.defaultProps = {
  isLoading: true
};

export default Player;
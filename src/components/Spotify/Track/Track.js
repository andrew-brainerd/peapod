import React from 'react';
import { string } from 'prop-types';
import styles from './Track.module.scss';

const Track = ({ className, name }) => {
  return (
    <div className={[
      styles.track,
      className || ''
    ].join(' ')}>
      {name}
    </div>
  );
};

Track.propTypes = {
  className: string,
  name: string
};

export default Track;

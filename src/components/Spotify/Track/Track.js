import React from 'react';
import { string, func } from 'prop-types';
import noop from '../../../utils/noop';
import styles from './Track.module.scss';

const Track = ({ className, name, onClick }) => {
  return (
    <div className={[
      styles.track,
      className || ''
    ].join(' ')}
    onClick={onClick || noop}
    >
      {name}
    </div>
  );
};

Track.propTypes = {
  className: string,
  name: string,
  onClick: func
};

export default Track;

import React from 'react';
import { array } from 'prop-types';
import User from '../../Users/User/User';
import styles from './PodMembers.module.scss';

const PodMembers = ({ members }) => {
  return (
    <>
      <div className={styles.header}>Members</div>
      <div className={styles.podMembers}>
        {members.map(({ name }, m) =>
          <User
            key={m}
            name={name}
          />
        )}
      </div>
    </>
  )
}

PodMembers.propTypes = {
  members: array.isRequired
}

PodMembers.defaultProps = {
  members: []
}

export default PodMembers;

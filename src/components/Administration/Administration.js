import React, { useState } from 'react';
import { func } from 'prop-types';
import Button from '../common/Button/Button';
import styles from './Administration.module.scss';

const Administration = ({ createUser, createUserError, user }) => {
  const [showUserCreation, setUserCreation] = useState(true);
  const [email, setEmail] = useState('test');
  const [password, setPassword] = useState('test');

  const createUserStyle = !showUserCreation ? styles.hidden : styles.createUserContainer;

  return (
    <>
      <div className={styles.header}>Administration</div>
      <div className={styles.administration}>
        <Button
          className={styles.createUserButton}
          onClick={() => setUserCreation(!showUserCreation)}
          text={showUserCreation ? 'Cancel' : 'Add New User'}
        />
        <div className={createUserStyle}>
          <input
            type={'text'}
            placeholder={'Email'}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type={'password'}
            placeholder={'Password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            className={styles.submit}
            onClick={() => createUser(email, password)}
            text={'Create'}
          />
          {(createUserError || user) && (
            <div className={[
              styles.responseText,
              createUserError ? styles.error : styles.success
            ].join(' ')}>
              {createUserError || `Created user [${user.email}]`}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Administration.propTypes = {
  createUser: func.isRequired
}

export default Administration;

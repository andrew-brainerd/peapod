import React, { useState } from 'react';
import { func } from 'prop-types';
import Button from '../common/Button/Button';
import styles from './Administration.module.scss';

const Administration = ({ createUser }) => {
  const [showUserCreation, setUserCreation] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUserStyle = !showUserCreation ? styles.hidden : styles.createUserContainer;

  return (
    <>
      <div className={styles.header}>Administration</div>
      <div className={styles.administration}>
        <Button
          className={styles.createUserButton}
          onClick={() => setUserCreation(!showUserCreation)}
          text={'New User'}
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
        </div>
      </div>
    </>
  );
}

Administration.propTypes = {
  createUser: func.isRequired
}

export default Administration;

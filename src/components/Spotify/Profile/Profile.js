import React, { useState } from 'react';
import { string, object, func } from 'prop-types';
import { MY_PODS_ROUTE } from '../../../constants/routes';
import Button from '../../common/Button/Button';
import styles from './Profile.module.scss';

const Profile = ({ pathname, profile, isSignedIn, navTo, signOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { id, display_name: name } = profile || {};
  console.log(profile);
  const myPodsRoute = MY_PODS_ROUTE.replace(':userId', id);

  return isSignedIn && (
    <div className={styles.profile}>
      <Button
        className={[
          styles.profileButton,
          isMenuOpen ? styles.menuOpen : ''
        ].join(' ')}
        text={name || 'Profile'}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen &&
        <div className={styles.menu}>
          <Button
            className={styles.menuItem}
            text={'My Pods'}
            onClick={() => {
              setIsMenuOpen(false);
              navTo(myPodsRoute);
            }}
          />
          <Button
            className={styles.menuItem}
            text={'Sign Out'}
            onClick={() => {
              setIsMenuOpen(false);
              signOut();
            }}
          />
        </div>
      }
    </div>
  );
};

Profile.propTypes = {
  pathname: string,
  profile: object,
  signOut: func.isRequired
};

export default Profile;

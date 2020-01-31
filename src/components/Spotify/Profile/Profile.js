import React, { useState, useRef } from 'react';
import { string, object, func } from 'prop-types';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { MY_PODS_ROUTE } from '../../../constants/routes';
import Button from '../../common/Button/Button';
import styles from './Profile.module.scss';

const Profile = ({ pathname, profile, isSignedIn, navTo, signOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const { id, display_name: name } = profile || {};
  const myPodsRoute = MY_PODS_ROUTE.replace(':userId', id);

  useOnClickOutside(menuRef, () => setIsMenuOpen(false));

  console.log(profile);

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
        <div ref={menuRef} className={styles.menu}>
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

import React, { useState, useRef } from 'react';
import { object, bool, func } from 'prop-types';
import { path } from 'ramda';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { PODS_ROUTE } from '../../../constants/routes';
import Button from '../../common/Button/Button';
import styles from './Profile.module.scss';

const getProfilePic = images => {
  const imageUrl = path(['0', 'url'], images);
  return imageUrl && <img src={imageUrl} alt='My Profile' />;
};

const Profile = ({ profile, isSignedIn, isMinimal, signOut, navTo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const { id, display_name: name, images } = profile || {};
  const myPodsRoute = PODS_ROUTE.replace(':userId', id);

  useOnClickOutside(menuRef, () => setIsMenuOpen(false));

  return isSignedIn && (
    <div className={[
      styles.profile,
      isMinimal ? styles.minimal : ''
    ].join(' ')}>
      <Button
        className={[
          styles.profileButton,
          isMenuOpen ? styles.menuOpen : ''
        ].join(' ')}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {getProfilePic(images) || name || 'My Profile'}
      </Button>
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
  profile: object,
  isSignedIn: bool,
  isMinimal: bool,
  signOut: func.isRequired,
  navTo: func.isRequired
};

export default Profile;

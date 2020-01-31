import React, { useState, useRef } from 'react';
import { string, object, func } from 'prop-types';
import { path } from 'ramda';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { MY_PODS_ROUTE } from '../../../constants/routes';
import Button from '../../common/Button/Button';
import styles from './Profile.module.scss';

const getProfilePic = images => {
  const imageUrl = path(['0', 'url'], images);
  console.log(imageUrl);
  return imageUrl && <img src={imageUrl} alt='My Profile' />;
};

const Profile = ({ pathname, profile, isSignedIn, navTo, signOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const { id, display_name: name, images } = profile || {};
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
  pathname: string,
  profile: object,
  signOut: func.isRequired
};

export default Profile;

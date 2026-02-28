import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/configureStore';
import { useNavigate } from 'react-router-dom';
import { getProfile, signOut } from '../../../slices/spotify';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { PODS_ROUTE, HOME_ROUTE } from '../../../constants/routes';
import Button from '../../common/Button/Button';
import type { SpotifyImage } from '../../../types';
import styles from './Profile.module.scss';

const getProfilePic = (images?: SpotifyImage[]) => {
  const imageUrl = images?.[0]?.url;
  return imageUrl && <img src={imageUrl} alt='My Profile' />;
};

interface ProfileProps {
  isMinimal?: boolean;
}

const Profile = ({ isMinimal }: ProfileProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector(getProfile);
  const isSignedIn = !!profile;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { id, display_name: name, images } = profile || {};
  const myPodsRoute = PODS_ROUTE.replace(':userId', id || '');

  useOnClickOutside(menuRef, () => setIsMenuOpen(false));

  return isSignedIn ? (
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
              navigate(myPodsRoute);
            }}
          />
          <Button
            className={styles.menuItem}
            text={'Sign Out'}
            onClick={() => {
              setIsMenuOpen(false);
              dispatch(signOut());
              navigate(HOME_ROUTE);
            }}
          />
        </div>
      }
    </div>
  ) : null;
};

export default Profile;

import React, { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import { useProfile } from '../../../queries/spotify';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import Button from '../../common/Button/Button';
import type { SpotifyImage } from '../../../types';
import styles from './Profile.module.scss';

const ProfilePic = ({ images }: { images?: SpotifyImage[] }) => {
  const imageUrl = images?.[0]?.url;
  return imageUrl ? (
    <img src={imageUrl} alt="My Profile" className={styles.profilePic} />
  ) : (
    <div className={styles.profilePicPlaceholder} />
  );
};

interface ProfileProps {
  isMinimal?: boolean;
}

const Profile = ({ isMinimal }: ProfileProps) => {
  const navigate = useNavigate();
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const signOut = useSpotifyStore((state) => state.signOut);
  const { data: profile } = useProfile(accessToken);
  const isSignedIn = !!profile;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { display_name: name, images } = profile || {};

  useOnClickOutside(menuRef, () => setIsMenuOpen(false));

  return (
    <div className={[styles.profile, isMinimal ? styles.minimal : ''].join(' ')}>
      <Button
        className={[styles.profileButton, isMenuOpen ? styles.menuOpen : ''].join(' ')}
        onClick={() => isSignedIn && setIsMenuOpen(!isMenuOpen)}
      >
        <ProfilePic images={images} />
      </Button>
      {isMenuOpen && (
        <div ref={menuRef} className={styles.menu}>
          <Button
            className={styles.menuItem}
            text={'My Pods'}
            onClick={() => {
              setIsMenuOpen(false);
              navigate({ to: '/pods' });
            }}
          />
          <Button
            className={styles.menuItem}
            text={'Sign Out'}
            onClick={() => {
              setIsMenuOpen(false);
              signOut();
              navigate({ to: '/' });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;

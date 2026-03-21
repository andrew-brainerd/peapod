import React, { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import { useProfile } from '../../../queries/spotify';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import Button from '../../common/Button/Button';
import type { SpotifyImage } from '../../../types';

const ProfilePic = ({ images, isMenuOpen }: { images?: SpotifyImage[]; isMenuOpen?: boolean }) => {
  const imageUrl = images?.[0]?.url;
  return imageUrl ? (
    <img src={imageUrl} alt="My Profile" className={`block h-8 w-8 transition-all duration-300 max-mobile:h-6 max-mobile:w-6 ${isMenuOpen ? 'rounded-none' : 'rounded-full'}`} />
  ) : (
    <div className="rounded-full block h-8 w-8 bg-transparent transition-all duration-300 max-mobile:h-6 max-mobile:w-6" />
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
    <div>
      <Button
        className="!bg-transparent relative !w-auto hover:!bg-transparent"
        onClick={() => isSignedIn && setIsMenuOpen(!isMenuOpen)}
      >
        <ProfilePic images={images} isMenuOpen={isMenuOpen} />
      </Button>
      {isMenuOpen && (
        <div ref={menuRef} className={`bg-btn rounded-[5px] rounded-tr-none px-2.5 py-0 absolute right-3 max-mobile:right-[25px] ${isMinimal ? 'top-[45px]' : 'top-[55px] max-mobile:top-[45px]'}`}>
          <Button
            className="!my-2.5 !mx-auto opacity-80 hover:opacity-100"
            text={'My Pods'}
            onClick={() => {
              setIsMenuOpen(false);
              navigate({ to: '/pods' });
            }}
          />
          <Button
            className="!my-2.5 !mx-auto opacity-80 hover:opacity-100"
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

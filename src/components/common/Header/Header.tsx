import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import Notification from '../Notification/Notification';
import Profile from '../../Spotify/Profile/Profile';
import Button from '../Button/Button';
import logo from '../../../img/logo.png';

interface HeaderProps {
  isMinimal?: boolean;
}

const Header = ({ isMinimal }: HeaderProps) => {
  const navigate = useNavigate();
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const signOut = useSpotifyStore((state) => state.signOut);

  return (
    <div className="bg-secondary border-b border-btn mb-[30px] relative z-3">
      <div className="flex items-center px-5 py-2.5 z-4">
        <div className="flex items-center cursor-pointer flex-1 gap-3" onClick={() => navigate({ to: '/' })}>
          <img src={logo} className={`pointer-events-none ${isMinimal ? 'h-[30px] w-[30px]' : 'h-10 w-10'}`} alt="logo" />
          <span className={`text-peapod font-display max-mobile:hidden ${isMinimal ? 'text-[1.4em]' : 'text-[1.8em]'}`}>Peapod</span>
        </div>
        <div className="flex items-center gap-3 min-h-[32px] relative">
          <Profile isMinimal={isMinimal} />
          <Button
            className={`!bg-transparent border border-gray-50 !text-gray-20 text-[0.85em] !py-1.5 !px-4 !w-auto hover:!border-text-primary hover:!text-text-primary max-mobile:text-[0.8em] max-mobile:!py-[5px] max-mobile:!px-3 ${!accessToken ? 'invisible' : ''}`}
            text={'Log Out'}
            onClick={() => {
              signOut();
              navigate({ to: '/' });
            }}
          />
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default Header;

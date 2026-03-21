import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSpotifyStore } from '../../stores/spotifyStore';
import { getAuth } from '../../api/spotify';
import { PODS_ROUTE } from '../../constants/routes';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import logo from '../../img/logo.png';

const Home = () => {
  const navigate = useNavigate();
  const accessToken = useSpotifyStore((state) => state.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate({ to: PODS_ROUTE });
    }
  }, [accessToken, navigate]);

  return (
    <div className="flex items-center flex-col justify-center min-h-screen p-5">
      <div className="flex items-center gap-5 mb-12 max-mobile:gap-3.5 max-mobile:mb-9">
        <img className="h-[120px] w-[120px] max-mobile:h-12 max-mobile:w-12" src={logo} alt="Peapod Logo" />
        <h1 className="text-peapod font-display text-5xl m-0 max-mobile:text-[2.2em]">Peapod</h1>
      </div>
      <Button className="flex items-center bg-secondary border-secondary-light text-text-primary gap-2.5 py-3.5 px-7 w-auto hover:bg-secondary-light [&_svg]:h-6 [&_svg]:w-6" onClick={() => getAuth(PODS_ROUTE)}>
        <Icon name={'spotify'} title={'Spotify Logo'} />
        <span className="text-[1.1em]">Login with Spotify</span>
      </Button>
    </div>
  );
};

export default Home;

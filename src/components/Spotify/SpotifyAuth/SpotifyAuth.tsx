import React, { useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import { setLocalAuth, calculateExpireTime, getLocalReturnUri } from '../../../utils/spotify';
import Loading from '../../common/Loading/Loading';
import styles from './SpotifyAuth.module.scss';

const SpotifyAuth = () => {
  const setAuth = useSpotifyStore((state) => state.setAuth);
  const search = useSearch({ strict: false }) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: string;
  };
  const navigate = useNavigate();

  useEffect(() => {
    const auth = {
      accessToken: search.access_token ?? null,
      refreshToken: search.refresh_token ?? null,
      expireTime: calculateExpireTime(search.expires_in!)
    };

    setLocalAuth(auth);
    setAuth(auth);

    const returnUri = getLocalReturnUri() || '/pods';
    navigate({ to: returnUri });
  });

  return (
    <div className={styles.spotifyAuth}>
      Authenticating with Spotify...
      <Loading altText="Authenticating with Spotify..." />
    </div>
  );
};

export default SpotifyAuth;

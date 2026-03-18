import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/configureStore';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { setAuth } from '../../../slices/spotify';
import { setLocalAuth, calculateExpireTime, getLocalReturnUri } from '../../../utils/spotify';
import Loading from '../../common/Loading/Loading';
import styles from './SpotifyAuth.module.scss';

const SpotifyAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
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
    dispatch(setAuth(auth));

    const returnUri = getLocalReturnUri() || '/';
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

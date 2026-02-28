import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/configureStore';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { setAuth } from '../../../slices/spotify';
import { setLocalAuth, calculateExpireTime, getLocalReturnUri } from '../../../utils/spotify';
import { HOME_ROUTE } from '../../../constants/routes';
import Loading from '../../common/Loading/Loading';
import styles from './SpotifyAuth.module.scss';

const SpotifyAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = {
      accessToken: searchParams.get('access_token'),
      refreshToken: searchParams.get('refresh_token'),
      expireTime: calculateExpireTime(searchParams.get('expires_in')!)
    };

    setLocalAuth(auth);
    dispatch(setAuth(auth));

    navigate(getLocalReturnUri() || HOME_ROUTE);
  });

  return (
    <div className={styles.spotifyAuth}>
      Authenticating with Spotify...
      <Loading altText='Authenticating with Spotify...' />
    </div>
  );
};

export default SpotifyAuth;

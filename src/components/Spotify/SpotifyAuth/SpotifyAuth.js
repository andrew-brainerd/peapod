import React, { useEffect } from 'react';
import { shape, string, func } from 'prop-types';
import { setLocalAuth, calculateExpireTime, getLocalReturnUri } from '../../../utils/spotify';
import { SPOTIFY_ROUTE } from '../../../constants/routes';
import Loading from '../../common/Loading/Loading';
import styles from './SpotifyAuth.module.scss';

const SpotifyAuth = ({ query, setAuth, navTo }) => {
  useEffect(() => {
    const auth = {
      accessToken: query.access_token,
      refreshToken: query.refresh_token,
      expireTime: calculateExpireTime(query.expires_in)
    };

    setLocalAuth(auth);
    setAuth(auth);

    navTo(getLocalReturnUri() || SPOTIFY_ROUTE);
  });

  return (
    <div className={styles.spotifyAuth}>
      Authenticating with Spotify...
      <Loading altText='Authenticating with Spotify...' />
    </div>
  );
};

SpotifyAuth.propTypes = {
  query: shape({
    access_token: string,
    refresh_token: string,
    expires_in: string
  }),
  setAuth: func.isRequired,
  navTo: func.isRequired
};

export default SpotifyAuth;

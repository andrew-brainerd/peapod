import React, { useEffect } from 'react';
import { shape, string, func } from 'prop-types';
import { setSpotifyAuth, getReturnUri } from '../../../utils/spotify';
import { SPOTIFY_ROUTE } from '../../../constants/routes';
import Loading from '../../common/Loading/Loading';
import styles from './SpotifyAuth.module.scss';

const SpotifyAuth = ({ query, navTo }) => {
  useEffect(() => {
    setSpotifyAuth({
      accessToken: query.access_token,
      refreshToken: query.refresh_token,
      expiresIn: query.expires_in
    });

    navTo(getReturnUri() || SPOTIFY_ROUTE);
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
  navTo: func.isRequired
};

export default SpotifyAuth;

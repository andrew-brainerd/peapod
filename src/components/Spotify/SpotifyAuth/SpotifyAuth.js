import React, { useEffect } from 'react';
import { shape, string, func } from 'prop-types';
import { SPOTIFY_ROUTE } from '../../../constants/routes';
import Loading from '../../common/Loading/Loading';
import styles from './SpotifyAuth.module.scss';

const SpotifyAuth = ({ query, navTo }) => {
  useEffect(() => {
    // console.log(`Expires In: `, query.expiresIn);
    const returnUri = localStorage.getItem('spotifyReturnUri');

    localStorage.setItem('spotifyAccessToken', query.access_token);
    localStorage.setItem('spotifyRefreshToken', query.refresh_token);

    navTo(returnUri || SPOTIFY_ROUTE);
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
    refresh_token: string
  }),
  navTo: func.isRequired
};

export default SpotifyAuth;

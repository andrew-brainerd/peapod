import React, { useEffect } from 'react';
import { bool, array, func } from 'prop-types';
import { isEmpty, uniqBy } from 'ramda';
import { getAuth } from '../../api/spotify';
import styles from './Spotify.module.scss';
import Album from './Album/Album';

const Spotify = ({ hasAuth, albums, getLogicAlbums }) => {
  useEffect(() => {
    if (hasAuth) {
      console.log(`Getting User Albums`);
      getLogicAlbums();
    } else {
      console.log('Need to authorize');
      getAuth();
    }
  }, [hasAuth, getLogicAlbums]);

  return (
    <div className={styles.spotify}>
      {
        isEmpty(albums) ?
          <h1>No Albums</h1> :
          uniqBy(album => album.name , albums).map(album => <Album {...album} />)
      }
    </div>
  );
};

Spotify.propTypes = {
  hasAuth: bool,
  albums: array,
  getLogicAlbums: func.isRequired
};

export default Spotify;

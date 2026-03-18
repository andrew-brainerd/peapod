import React from 'react';
import styles from './Album.module.scss';

interface AlbumProps {
  name?: string;
}

const Album = ({ name }: AlbumProps) => {
  return <div className={styles.album}>{name}</div>;
};

export default Album;

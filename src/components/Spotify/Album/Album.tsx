import React from 'react';

interface AlbumProps {
  name?: string;
}

const Album = ({ name }: AlbumProps) => {
  return <div className="m-2.5">{name}</div>;
};

export default Album;

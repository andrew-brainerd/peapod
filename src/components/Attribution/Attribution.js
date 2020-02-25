import React from 'react';
import styles from './Attribution.module.scss';

/*

Loading Icons
Green + Blue: https://loading.io/asset/345067
Green + Purple: https://loading.io/asset/345070
*/

const iconCreators = [
  {
    authorName: 'Those Icons',
    authorLink: 'https://www.flaticon.com/authors/those-icons'
  },
  {
    authorName: 'Dave Gandy',
    authorLink: 'https://www.flaticon.com/authors/dave-gandy'
  }
];

const Attribution = () => {
  return (
    <div className={styles.attribution}>
      <h2>Icons Made By</h2>
      {iconCreators.map(({ authorLink, authorName }) => {
        return (
          <div key={authorName} className={styles.author}>
            <a href={authorLink} title={authorName}>{authorName}</a> from
            <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a>
          </div>
        );
      })}
    </div>
  );
};

export default Attribution;

import React from 'react';
import { string } from 'prop-types';
import styles from './PageTitle.module.scss';

const PageTitle = ({ text, subText }) => (
  <>
    <h2 className={styles.title}>{text}</h2>
    {subText && <h3 className={styles.subtitle}>{subText}</h3>}
  </>
);

PageTitle.propTypes = {
  text: string.isRequired,
  subText: string
};

export default PageTitle;

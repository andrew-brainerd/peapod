import React from 'react';
import styles from './PageTitle.module.scss';

interface PageTitleProps {
  text: string;
  subText?: string;
}

const PageTitle = ({ text, subText }: PageTitleProps) => (
  <>
    <h2 className={styles.title}>{text}</h2>
    {subText && <h3 className={styles.subtitle}>{subText}</h3>}
  </>
);

export default PageTitle;

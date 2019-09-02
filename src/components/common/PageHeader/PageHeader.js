import React from 'react';
import { string, node } from 'prop-types';
import PageTitle from '../PageTitle/PageTitle';
import styles from './PageHeader.module.scss';

const PageHeader = ({ children, subtitle, title }) => (
  <div className={styles.pageHeader}>
    <PageTitle text={title} subText={subtitle} />
    <div className={styles.aside}>
      {children}
    </div>
  </div>
);

PageHeader.propTypes = {
  children: node,
  subtitle: string,
  title: string.isRequired  
}

export default PageHeader;

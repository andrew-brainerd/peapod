import React from 'react';
import PageTitle from '../PageTitle/PageTitle';
import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  children?: React.ReactNode;
  subtitle?: string;
  title: string;
}

const PageHeader = ({ children, subtitle, title }: PageHeaderProps) => (
  <div className={styles.pageHeader}>
    <PageTitle text={title} subText={subtitle} />
    <div className={styles.aside}>{children}</div>
  </div>
);

export default PageHeader;

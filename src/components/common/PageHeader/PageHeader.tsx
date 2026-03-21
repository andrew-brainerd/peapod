import React from 'react';
import PageTitle from '../PageTitle/PageTitle';

interface PageHeaderProps {
  children?: React.ReactNode;
  subtitle?: string;
  title: string;
}

const PageHeader = ({ children, subtitle, title }: PageHeaderProps) => (
  <div className="flex items-center mx-[50px] my-[5px]">
    <PageTitle text={title} subText={subtitle} />
    <div className="flex ml-auto mr-[15px]">{children}</div>
  </div>
);

export default PageHeader;

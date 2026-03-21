import React from 'react';

interface PageTitleProps {
  text: string;
  subText?: string;
}

const PageTitle = ({ text, subText }: PageTitleProps) => (
  <>
    <h2 className="cursor-default inline-block mt-[25px] mb-[25px] ml-5 mr-[15px]">{text}</h2>
    {subText && <h3 className="text-peapod-secondary cursor-default inline-block text-[0.7em] align-baseline mt-[38px] max-mobile:hidden">{subText}</h3>}
  </>
);

export default PageTitle;

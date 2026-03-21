import React from 'react';
import Icon from '../../common/Icon/Icon';

interface LoadingProps {
  title?: string;
  altText?: string;
  isActive?: boolean;
}

const Loading = ({ isActive = true, title = 'Loading...' }: LoadingProps) => {
  return (
    isActive && (
      <div className="w-[150px]">
        <Icon name={'ripple-purple'} title={title} />
      </div>
    )
  );
};

export default Loading;

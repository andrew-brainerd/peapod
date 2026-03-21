import React from 'react';
import Button from '../../common/Button/Button';

interface PodItemProps {
  numMembers?: number;
  action?: (value: boolean) => void;
}

const PodItem = ({ numMembers = 0, action }: PodItemProps) => {
  return (
    <Button
      className="!h-[125px] !m-5 !py-[30px] !px-5 !text-left !w-[350px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.2),0_1px_4px_rgba(0,0,0,0.16)] transition-shadow duration-150 [&>div]:m-2.5 max-mobile:!mx-[15px] max-mobile:!my-[5px] max-mobile:hover:shadow-none"
      text={'Pod'}
      onClick={() => action?.(true)}
    >
      <div className="text-sm">{`${numMembers} member${numMembers !== 1 ? 's' : ''}`}</div>
    </Button>
  );
};

export default PodItem;

import React from 'react';
import Button from '../../../common/Button/Button';
import Icon from '../../../common/Icon/Icon';

interface PodHeaderProps {
  onInviteClick: () => void;
}

const PodHeader = ({ onInviteClick }: PodHeaderProps) => {
  return (
    <div className="flex justify-end py-[5px]">
      <Button className="!bg-transparent flex items-center gap-1.5 !py-1.5 !px-3 !w-auto hover:!bg-transparent hover:!text-peapod [&_svg]:fill-text-primary [&_svg]:h-[18px] [&_svg]:w-[18px] [&_svg]:transition-[fill] [&_svg]:duration-200 hover:[&_svg]:fill-peapod" onClick={onInviteClick}>
        <Icon name={'invite'} title={'Invite People'} />
        <span className="text-[0.85em]">Invite</span>
      </Button>
    </div>
  );
};

export default PodHeader;

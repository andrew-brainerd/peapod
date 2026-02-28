import React from 'react';
import { ReactSVG } from 'react-svg';
import noop from '../../../utils/noop';

interface IconProps {
  className?: string;
  name: string;
  title?: string;
  onClick?: () => void;
}

const Icon = ({ className, name, title, onClick }: IconProps) => {
  const iconImage = new URL(`../../../img/${name}.svg`, import.meta.url).href;
  return (
    <ReactSVG
      className={className}
      title={title || name}
      src={iconImage}
      wrapper={'span'}
      onClick={onClick || noop}
    />
  );
};

export default Icon;

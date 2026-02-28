import React from 'react';
import { string, func } from 'prop-types';
import { ReactSVG } from 'react-svg';
import noop from '../../../utils/noop';

const Icon = ({ className, name, title, onClick }) => {
  const iconImage = require(`../../../img/${name}.svg`);
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

Icon.propTypes = {
  className: string,
  name: string.isRequired,
  title: string,
  onClick: func
};

export default Icon;

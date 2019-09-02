import React from 'react';
import { bool, func, string } from 'prop-types';
import noop from 'lodash/noop';
import styles from './Button.module.scss';

const Button = ({ className, disabled, onClick, text }) => (
  <div
    className={[
      styles.button,
      disabled ? styles.disabled : '',
      className
    ].join(' ')}
    onClick={!disabled ? onClick : noop}
  >
    {text}
  </div>
);

Button.propTypes = {
  className: string,
  disabled: bool,
  onClick: func.isRequired,
  text: string.isRequired,
}

export default Button;

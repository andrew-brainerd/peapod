import React from 'react';
import noop from '../../../utils/noop';
import styles from './Button.module.scss';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  text?: string;
}

const Button = ({ children, className, disabled, onClick, text }: ButtonProps) => (
  <div
    className={[styles.button, disabled ? styles.disabled : '', className].join(' ')}
    onClick={!disabled ? onClick : noop}
  >
    {children || text}
  </div>
);

export default Button;

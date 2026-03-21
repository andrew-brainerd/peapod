import React from 'react';
import noop from '../../../utils/noop';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  text?: string;
}

const Button = ({ children, className, disabled, onClick, text }: ButtonProps) => (
  <div
    className={`bg-btn rounded-[7px] text-text-primary cursor-pointer text-[0.9em] p-2.5 text-center w-[150px] select-none transition-[background,opacity] duration-150 ease-in-out ${disabled ? 'cursor-default opacity-50' : 'hover:bg-btn-hover active:opacity-80'} ${className || ''}`}
    onClick={!disabled ? onClick : noop}
  >
    {children || text}
  </div>
);

export default Button;

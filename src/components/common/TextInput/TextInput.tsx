import React, { useState, useRef, useEffect } from 'react';
import noop from '../../../utils/noop';

interface TextInputProps {
  placeholder?: string;
  value?: string;
  inputClassName?: string;
  error?: string;
  autofocus?: boolean;
  onChange?: (value: string) => void;
  onPressEnter?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const TextInput = ({
  placeholder,
  value,
  inputClassName,
  error,
  autofocus,
  onChange,
  onPressEnter,
  onFocus,
  onBlur
}: TextInputProps) => {
  const [val, setVal] = useState(value || '');
  const [inputError, setInputError] = useState(error);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    autofocus && inputRef.current?.focus();
  }, [autofocus]);

  useEffect(() => {
    setInputError(error);
  }, [error]);

  useEffect(() => {
    value && setVal(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setVal(newValue);
    onChange ? onChange(newValue) : noop();
  };

  const handleKeyPress = ({ key }: React.KeyboardEvent) => {
    if (key === 'Enter') {
      onPressEnter ? onPressEnter() : noop();
    }
  };

  return (
    <div className="relative text-center">
      <input
        type={'text'}
        className={`appearance-none bg-primary border border-transparent rounded-[5px] text-text-primary outline-none py-2.5 px-[5px] transition-[border] duration-200 focus:border-accent text-[1.5em] text-center ${inputClassName || ''}`}
        placeholder={placeholder || ''}
        ref={inputRef}
        value={val}
        autoComplete={'false'}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onFocus={onFocus || noop}
        onBlur={onBlur || noop}
      />
      {inputError && <div className="text-error italic my-[7px] mx-0 absolute bottom-[-25px] left-[5px] transition-all duration-500 ease-in-out">{inputError}</div>}
    </div>
  );
};

export default TextInput;

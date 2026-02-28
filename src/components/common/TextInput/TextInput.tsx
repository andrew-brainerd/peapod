import React, { useState, useRef, useEffect } from 'react';
import noop from '../../../utils/noop';
import styles from './TextInput.module.scss';

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
    <div className={styles.textInputContainer}>
      <input
        type={'text'}
        className={[
          styles.textInput,
          inputClassName || ''
        ].join(' ')}
        placeholder={placeholder || ''}
        ref={inputRef}
        value={val}
        autoComplete={'false'}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onFocus={onFocus || noop}
        onBlur={onBlur || noop}
      />
      {inputError && (
        <div className={styles.inputError}>
          {inputError}
        </div>
      )}
    </div>
  );
};

export default TextInput;

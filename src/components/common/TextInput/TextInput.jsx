import React, { useState, useRef, useEffect } from 'react';
import { string, bool, func } from 'prop-types';
import noop from '../../../utils/noop';
import styles from './TextInput.module.scss';

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
}) => {
  const [val, setVal] = useState(value || '');
  const [inputError, setInputError] = useState(error);
  const inputRef = useRef();

  useEffect(() => {
    autofocus && inputRef.current.focus();
  }, [autofocus]);

  useEffect(() => {
    setInputError(error);
  }, [error]);

  useEffect(() => {
    value && setVal(value);
  }, [value]);

  const handleChange = event => {
    const newValue = event.target.value;
    setVal(newValue);
    onChange ? onChange(newValue) : noop();
  };

  const handleKeyPress = ({ key }) => {
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

TextInput.propTypes = {
  placeholder: string,
  value: string,
  inputClassName: string,
  error: string,
  autofocus: bool,
  onChange: func,
  onPressEnter: func,
  onFocus: func,
  onBlur: func
};

export default TextInput;

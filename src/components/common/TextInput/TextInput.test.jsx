import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput Component', () => {
  it('should render', () => {
    render(<TextInput placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText('Placeholder')).toBeInTheDocument();
  });

  it('should set the default placeholder', () => {
    render(<TextInput />);

    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', '');
  });

  it('should show input error', () => {
    render(<TextInput error="input error" />);

    expect(screen.getByText('input error')).toBeInTheDocument();
  });

  it('should set input value to given value', () => {
    render(<TextInput value="input value" />);

    expect(screen.getByRole('textbox')).toHaveValue('input value');
  });

  it('should update input value on change', () => {
    render(<TextInput />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'updated value' } });

    expect(screen.getByRole('textbox')).toHaveValue('updated value');
  });

  it('should call onPressEnter on Enter key', () => {
    const onPressEnter = vi.fn();
    render(<TextInput onPressEnter={onPressEnter} />);

    fireEvent.keyPress(screen.getByRole('textbox'), { key: 'Enter', charCode: 13 });

    expect(onPressEnter).toHaveBeenCalled();
  });

  it('should call onFocus when focused', () => {
    const onFocus = vi.fn();
    render(<TextInput onFocus={onFocus} />);

    fireEvent.focus(screen.getByRole('textbox'));

    expect(onFocus).toHaveBeenCalled();
  });

  it('should call onBlur when blurred', () => {
    const onBlur = vi.fn();
    render(<TextInput onBlur={onBlur} />);

    fireEvent.blur(screen.getByRole('textbox'));

    expect(onBlur).toHaveBeenCalled();
  });
});

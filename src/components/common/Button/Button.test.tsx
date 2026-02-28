import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('should render', () => {
    render(<Button onClick={vi.fn()} text="Click me" />);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} text="Click me" />);

    fireEvent.click(screen.getByText('Click me'));

    expect(onClick).toHaveBeenCalled();
  });

  it('should not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} text="Click me" disabled />);

    fireEvent.click(screen.getByText('Click me'));

    expect(onClick).not.toHaveBeenCalled();
  });
});

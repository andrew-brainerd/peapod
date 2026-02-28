import React from 'react';
import { render, screen } from '@testing-library/react';
import Attribution from './Attribution';

describe('Attribution Component', () => {
  it('should render', () => {
    render(<Attribution />);

    expect(screen.getByText('Icons Made By')).toBeInTheDocument();
  });
});

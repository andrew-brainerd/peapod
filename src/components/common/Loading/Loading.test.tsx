import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading Component', () => {
  it('should render when active', () => {
    const { container } = render(<Loading isActive={true} title="Loading..." />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should not render when not active', () => {
    const { container } = render(<Loading isActive={false} title="Loading..." />);

    expect(container.firstChild).toBeNull();
  });
});

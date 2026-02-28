import React from 'react';
import { render, screen } from '@testing-library/react';
import PageTitle from './PageTitle';

describe('PageTitle Component', () => {
  it('should render', () => {
    render(<PageTitle text="Page Title" subText="Page Subtitle" />);

    expect(screen.getByText('Page Title')).toBeInTheDocument();
    expect(screen.getByText('Page Subtitle')).toBeInTheDocument();
  });
});

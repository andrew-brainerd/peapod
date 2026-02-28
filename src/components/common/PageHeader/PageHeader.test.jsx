import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from './PageHeader';

describe('PageHeader Component', () => {
  it('should render', () => {
    render(
      <PageHeader title="Page Title" subtitle="Page Subtitle">
        <span>Child Component</span>
      </PageHeader>
    );

    expect(screen.getByText('Page Title')).toBeInTheDocument();
    expect(screen.getByText('Page Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});

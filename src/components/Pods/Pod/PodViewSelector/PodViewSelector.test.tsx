import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SEARCH } from '../../../../constants/pods';
import PodViewSelector from './PodViewSelector';

describe('PodViewSelector Component', () => {
  it('should render', () => {
    const { container } = render(
      <MemoryRouter>
        <PodViewSelector
          className=""
          podId="12345"
          selectedView={SEARCH}
        />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});

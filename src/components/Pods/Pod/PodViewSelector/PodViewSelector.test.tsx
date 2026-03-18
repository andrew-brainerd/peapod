import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { SEARCH } from '../../../../constants/pods';
import { RouterTestWrapper } from '../../../../test/helpers';
import PodViewSelector from './PodViewSelector';

const PodViewSelectorWrapper = () => <PodViewSelector className="" podId="12345" selectedView={SEARCH} />;

describe('PodViewSelector Component', () => {
  it('should render', async () => {
    const { container } = render(<RouterTestWrapper component={PodViewSelectorWrapper} />);

    await waitFor(() => {
      expect(container.querySelector('[class*="podViewSelector"]')).toBeInTheDocument();
    });
  });
});

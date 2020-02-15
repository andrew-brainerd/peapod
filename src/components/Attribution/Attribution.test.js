import React from 'react';
import { shallow } from 'enzyme';
import Attribution from './Attribution';

describe('Attribution Component', () => {
  const render = () => shallow(<Attribution />);

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });
});

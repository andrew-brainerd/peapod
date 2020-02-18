import React from 'react';
import { shallow } from 'enzyme';
import PageTitle from '../PageTitle/PageTitle';
import PageHeader from './PageHeader';

describe('PageHeader Component', () => {
  let props;

  beforeEach(() => {
    props = {
      children: <span>Child Component</span>,
      subtitle: 'Page Subtitle',
      title: 'Page Title'
    };
  });

  const render = () => shallow(
    <PageHeader {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should render a PageTitle component', () => {
    const component = render();
    
    expect(component.find(PageTitle)).toBeTruthy();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import PageTitle from './PageTitle';

describe('PageTitle Component', () => {
  let props;

  beforeEach(() => {
    props = {
      text: 'Page Title',
      subText: 'Page Subtitle'
    };
  });

  const render = () => shallow(
    <PageTitle {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });
});

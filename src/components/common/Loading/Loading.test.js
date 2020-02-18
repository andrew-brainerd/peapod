import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

describe('Loading Component', () => {
  let props;

  beforeEach(() => {
    props = {
      altText: '',
      isLoading: false
    };
  });

  const render = () => shallow(
    <Loading {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should not render when not loading', () => {
    props.isLoading = true;
    const component = render();

    expect(component).toEqual({});
  });
});

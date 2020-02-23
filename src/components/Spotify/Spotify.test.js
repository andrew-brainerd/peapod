import React from 'react';
import { shallow } from 'enzyme';
import { HOME_ROUTE } from '../../constants/routes';
import Button from '../common/Button/Button';
import { ReactComponent as SpotifyIcon } from '../../img/spotify.svg';
import Spotify from './Spotify';

describe('Spotify Component', () => {
  let props;

  beforeEach(() => {
    props = {
      hasAuth: false,
      pathname: '/path',
      children: <div>Some Spotify Content</div>,
      loadLocalAuth: jest.fn(),
      getProfile: jest.fn()
    };
  });

  const render = () => shallow(
    <Spotify {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  describe('Create Button', () => {
    it('should render when auth not present', () => {
      const component = render();

      expect(component.find(Button)).toBeTruthy();
    });

    it('should not render when auth present', () => {
      const component = render();

      expect(component.find(Button)).toEqual({});
    });

    it('should not render on home page', () => {
      props.pathname = HOME_ROUTE;
      const component = render();

      expect(component.find(Button)).toEqual({});
    });
  });

  it('should render an icon component', () => {
    const component = render();

    expect(component.find(SpotifyIcon)).toBeTruthy();
  });
});

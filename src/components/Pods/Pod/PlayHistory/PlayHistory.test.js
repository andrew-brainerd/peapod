import React from 'react';
import { shallow } from 'enzyme';
import Track from '../../../Spotify/Track/Track';
import PlayHistory from './PlayHistory';

describe('PlayHistory Component', () => {
  let props;

  beforeEach(() => {
    props = {
      height: 1000,
      currentTrack: {},
      history: []
    };
  });

  const render = () => shallow(
    <PlayHistory {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should render a Track component', () => {
    const component = render();

    expect(component.find(Track)).toBeTruthy();
  });
});

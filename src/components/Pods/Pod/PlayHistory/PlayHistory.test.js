import React from 'react';
import { shallow } from 'enzyme';
import Track from '../../../Spotify/Track/Track';
import PlayHistory from './PlayHistory';

describe('PlayHistory Component', () => {
  let props, component;

  beforeEach(() => {
    props = {
      height: 1000,
      currentTrack: {},
      history: [
        { name: 'Keanu Reeves' }
      ]
    };

    component = render();
  });

  const render = () => shallow(
    <PlayHistory {...props} />
  );

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should render a Track component', () => {
    expect(component.find(Track)).toBeTruthy();
  });
});

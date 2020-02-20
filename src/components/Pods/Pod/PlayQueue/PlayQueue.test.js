import React from 'react';
import { shallow } from 'enzyme';
import Track from '../../../Spotify/Track/Track';
import PlayQueue from './PlayQueue';

describe('PlayQueue Component', () => {
  let props;

  beforeEach(() => {
    props = {
      height: 1000,
      currentTrack: {},
      queue: []
    };
  });

  const render = () => shallow(
    <PlayQueue {...props} />
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

import { connect } from 'react-redux';
import { getAccessToken, getIsLoadingTracks, getTracks } from '../../../selectors/spotify';
import { play, pause } from '../../../actions/spotify';
import TrackList from './TrackList';

const mapStateToProps = state => ({
  hasAuth: !!getAccessToken(state),
  isLoading: getIsLoadingTracks(state),
  tracks: getTracks(state)
});

const mapDispatchToProps = dispatch => ({
  play: uids => dispatch(play(uids)),
  pause: () => dispatch(pause())
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);

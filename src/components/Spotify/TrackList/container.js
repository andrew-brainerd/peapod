import { connect } from 'react-redux';
import { getAccessToken, getIsLoadingTracks, getTracks } from '../../../selectors/spotify';
import { navTo } from '../../../actions/routing';
import TrackList from './TrackList';

const mapStateToProps = state => ({
  hasAuth: !!getAccessToken(state),
  isLoading: getIsLoadingTracks(state),
  tracks: getTracks(state)
});

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);

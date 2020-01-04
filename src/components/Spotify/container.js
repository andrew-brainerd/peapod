import { connect } from 'react-redux';
import { getAccessToken, getIsLoadingTracks, getTracks } from '../../selectors/spotify';
import { getMyTopTracks } from '../../actions/spotify';
import { navTo } from '../../actions/routing';
import Spotify from './Spotify';

const mapStateToProps = state => ({
  hasAuth: !!getAccessToken(),
  isLoading: getIsLoadingTracks(state),
  tracks: getTracks(state)
});

const mapDispatchToProps = dispatch => ({
  getMyTopTracks: () => dispatch(getMyTopTracks()),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Spotify);

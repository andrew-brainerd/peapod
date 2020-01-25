import { connect } from 'react-redux';
import { getAccessToken } from '../../utils/spotify';
import { getIsLoadingTracks, getTracks } from '../../selectors/spotify';
import { getPathname } from '../../selectors/routing';
import { getMyTopTracks } from '../../actions/spotify';
import { navTo } from '../../actions/routing';
import Spotify from './Spotify';

const mapStateToProps = state => ({
  hasAuth: !!getAccessToken(),
  isLoading: getIsLoadingTracks(state),
  tracks: getTracks(state),
  pathname: getPathname(state)
});

const mapDispatchToProps = dispatch => ({
  getMyTopTracks: () => dispatch(getMyTopTracks()),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Spotify);

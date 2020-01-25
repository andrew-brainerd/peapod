import { connect } from 'react-redux';
import { getAccessToken } from '../../../utils/spotify';
import { getIsLoadingTracks, getTracks } from '../../../selectors/spotify';
import { getPathname } from '../../../selectors/routing';
import { navTo } from '../../../actions/routing';
import Player from './Player';

const mapStateToProps = state => ({
  hasAuth: !!getAccessToken(),
  isLoading: getIsLoadingTracks(state),
  tracks: getTracks(state),
  pathname: getPathname(state)
});

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);

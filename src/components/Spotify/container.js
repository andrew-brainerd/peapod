import { connect } from 'react-redux';
import { getAccessToken } from '../../selectors/spotify';
import { getPathname } from '../../selectors/routing';
import { loadLocalAuth, getProfile } from '../../actions/spotify';
import Spotify from './Spotify';

const mapStateToProps = state => ({
  hasAuth: !!getAccessToken(state),
  pathname: getPathname(state)
});

const mapDispatchToProps = dispatch => ({
  loadLocalAuth: () => dispatch(loadLocalAuth()),
  getProfile: () => dispatch(getProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Spotify);

import { connect } from 'react-redux';
import { getAccessToken } from '../../selectors/spotify';
import { getPathname } from '../../selectors/routing';
import { loadLocalAuth } from '../../actions/spotify';
import { navTo } from '../../actions/routing';
import Spotify from './Spotify';

const mapStateToProps = state => ({
  hasAuth: !!getAccessToken(state),
  pathname: getPathname(state)
});

const mapDispatchToProps = dispatch => ({
  loadLocalAuth: () => dispatch(loadLocalAuth()),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Spotify);

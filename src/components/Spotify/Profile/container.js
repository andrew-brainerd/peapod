import { connect } from 'react-redux';
import { HOME_ROUTE } from '../../../constants/routes';
import { getPathname } from '../../../selectors/routing';
import { getProfile } from '../../../selectors/spotify';
import { signOut } from '../../../actions/spotify';
import { navTo } from '../../../actions/routing';
import Profile from './Profile';

const mapStateToProps = state => ({
  isVisible: getPathname(state) !== HOME_ROUTE,
  pathname: getPathname(state),
  profile: getProfile(state),
  isSignedIn: !!getProfile(state)
});

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path)),
  signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

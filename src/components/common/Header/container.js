import { connect } from 'react-redux';
import { HOME_ROUTE } from '../../../constants/routes';
import { getPathname } from '../../../selectors/routing';
import { getCurrentUserId } from '../../../selectors/users';
import { getProfile } from '../../../selectors/spotify';
import { signOut } from '../../../actions/spotify';
import { navTo } from '../../../actions/routing';
import Header from './Header';

const mapStateToProps = state => ({
  isVisible: getPathname(state) !== HOME_ROUTE,
  pathname: getPathname(state),
  userId: getCurrentUserId(state),
  isSignedIn: !!getProfile(state)
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

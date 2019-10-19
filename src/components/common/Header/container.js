import { connect } from 'react-redux';
import { navTo } from '../../../actions/routing';
import { getPathname } from '../../../selectors/routing';
import { getCurrentUserId } from '../../../selectors/users';
import { HOME_ROUTE } from '../../../constants/routes';
import Header from './Header';

const mapStateToProps = state => ({
  isVisible: getPathname(state) !== HOME_ROUTE,
  pathname: getPathname(state),
  userId: getCurrentUserId(state)
});

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import { connect } from 'react-redux';
import { HOME_ROUTE } from '../../../constants/routes';
import { getPathname } from '../../../selectors/routing';
import { navTo } from '../../../actions/routing';
import Header from './Header';

const mapStateToProps = state => ({
  isVisible: getPathname(state) !== HOME_ROUTE
});

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

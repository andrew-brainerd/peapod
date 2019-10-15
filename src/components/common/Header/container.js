import { connect } from 'react-redux';
import { navTo } from '../../../actions/routing';
import { getPathname } from '../../../selectors/routing';
import { HOME_ROUTE } from '../../../constants/routes';
import Header from './Header';

const mapStateToProps = ({ router }) => ({
  isVisible: getPathname(router) !== HOME_ROUTE,
  pathname: getPathname(router),
  route: () => { console.log(HOME_ROUTE); }
});

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

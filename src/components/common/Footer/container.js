import { connect } from 'react-redux';
import { getPathname } from '../../../selectors/routing';
import { HOME_ROUTE } from '../../../constants/routes';
import Header from './Footer';

const mapStateToProps = state => ({
  isVisible: getPathname(state) !== HOME_ROUTE
});

export default connect(mapStateToProps)(Header);

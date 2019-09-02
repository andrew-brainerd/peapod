import { connect } from 'react-redux';
import { getPathname } from '../../../selectors/routing';
import { HOME_ROUTE } from '../../../constants/routes';
import Header from './Footer';

const mapStateToProps = ({ router }) => ({
  isVisible: getPathname(router) !== HOME_ROUTE
});

export default connect(mapStateToProps)(Header);

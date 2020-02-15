import { connect } from 'react-redux';
import { navTo } from '../../../actions/routing';
import Header from './Header';

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(null, mapDispatchToProps)(Header);

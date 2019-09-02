import { connect } from 'react-redux';
import { navTo } from '../../actions/routing';
import Home from './Home';

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(null, mapDispatchToProps)(Home);

import { connect } from 'react-redux';
import { navTo } from '../../../actions/routing';
import PodSelection from './PodSelection';

const mapDispatchToProps = dispatch => ({
  navTo: route => dispatch(navTo(route))
});

export default connect(null, mapDispatchToProps)(PodSelection);

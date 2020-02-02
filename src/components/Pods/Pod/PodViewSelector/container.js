import { connect } from 'react-redux';
import { navTo } from '../../../../actions/routing';
import PodViewSelector from './PodViewSelector';

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(null, mapDispatchToProps)(PodViewSelector);

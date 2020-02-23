import { connect } from 'react-redux';
import { navTo } from '../../../../actions/routing';
import PodHeader from './PodHeader';

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(null, mapDispatchToProps)(PodHeader);

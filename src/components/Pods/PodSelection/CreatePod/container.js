import { connect } from 'react-redux';
import { getCreatedPod } from '../../../../selectors/pods';
import { createPod } from '../../../../actions/pods';
import { navTo } from '../../../../actions/routing';
import CreatePod from './CreatePod';

const mapStateToProps = state => ({
  createdPod: getCreatedPod(state)
});

const mapDispatchToProps = dispatch => ({
  createPod: name => dispatch(createPod(name)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePod);

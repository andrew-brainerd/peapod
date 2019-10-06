import { connect } from 'react-redux';
import { getCreatedPodName } from '../../../../selectors/pods';
import { createPod } from '../../../../actions/pods';
import CreatePod from './CreatePod';

const mapStateToProps = state => ({
  createdPodName: getCreatedPodName(state)
});

const mapDispatchToProps = dispatch => ({
  createPod: name => dispatch(createPod(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePod);

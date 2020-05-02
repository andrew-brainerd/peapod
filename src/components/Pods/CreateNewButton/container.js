import { connect } from 'react-redux';
import { getIsCreatingPod, getCreatedPod } from '../../../selectors/pods';
import { createPod } from '../../../actions/pods';
import { navTo } from '../../../actions/routing';
import CreateNewButton from './CreateNewButton';

const mapStateToProps = state => ({
  isCreatingPod: getIsCreatingPod(state),
  newPod: getCreatedPod(state)
});

const mapDispatchToProps = dispatch => ({
  createPod: name => dispatch(createPod(name)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewButton);

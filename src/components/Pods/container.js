import { connect } from 'react-redux';
import { getPodList } from '../../selectors/pods';
import { getCurrentUserId } from '../../selectors/users';
import { getPods } from '../../actions/pods';
import Pods from './Pods';

const mapStateToProps = state => ({
  pods: getPodList(state),
  userId: getCurrentUserId(state)
});

const mapDispatchToProps = dispatch => ({
  getMyPods: userId => dispatch(getPods({ userId: userId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pods);

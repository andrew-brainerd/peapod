import { connect } from 'react-redux';
import { getPodList } from '../../../../selectors/pods';
import { getCurrentUserName } from '../../../../selectors/users';
import { getPods, addMemberToPod, removeMemberFromPod } from '../../../../actions/pods';
import ViewAllPods from './ViewAllPods';

const mapStateToProps = state => ({
  pods: getPodList(state),
  userName: getCurrentUserName(state)
});

const mapDispatchToProps = dispatch => ({
  getPods: () => dispatch(getPods()),
  joinPod: podId => dispatch(addMemberToPod(podId)),
  leavePod: podId => dispatch(removeMemberFromPod(podId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllPods);

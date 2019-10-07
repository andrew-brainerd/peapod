import { connect } from 'react-redux';
import { getPodList } from '../../../../selectors/pods';
import { getCurrentUserName } from '../../../../selectors/users';
import { getPods } from '../../../../actions/pods';
import JoinPod from './JoinPod';

const mapStateToProps = state => ({
  pods: getPodList(state),
  userName: getCurrentUserName(state)
});

const mapDispatchToProps = dispatch => ({
  getPods: () => dispatch(getPods()),
  joinPod: pod => console.log(`Join Pod %o`, pod), //dispatch(joinPod(podId))
  leavePod: pod => console.log(`Leave Pod %o`, pod)
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinPod);

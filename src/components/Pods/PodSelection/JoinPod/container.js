import { connect } from 'react-redux';
import { getPodList } from '../../../../selectors/pods';
import { getPods } from '../../../../actions/pods';
import JoinPod from './JoinPod';

const mapStateToProps = state => ({
  pods: getPodList(state)
});

const mapDispatchToProps = dispatch => ({
  getPods: () => dispatch(getPods()),
  joinPod: pod => console.log(`Join Pod %o`, pod) //dispatch(joinPod(podId))
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinPod);

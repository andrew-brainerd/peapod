import { connect } from 'react-redux';
import { getPodId } from '../../../selectors/routing';
import { getCurrentPodMembers, getShouldUpdatePod } from '../../../selectors/pods';
import { getPod } from '../../../actions/pods';
import { navTo } from '../../../actions/routing';
import PodLobby from './PodLobby';

const mapStateToProps = state => ({
  podId: getPodId(state),
  podMembers: getCurrentPodMembers(state),
  shouldUpdate: getShouldUpdatePod(state)
});

const mapDispatchToProps = dispatch => ({
  getPod: podId => dispatch(getPod(podId)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(PodLobby);

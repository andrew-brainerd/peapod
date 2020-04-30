import { connect } from 'react-redux';
import { getPodId } from '../../../selectors/routing';
import { getCurrentPodMembers, getShouldUpdatePod, getCurrentPodCreatorId } from '../../../selectors/pods';
import { getProfileId } from '../../../selectors/spotify';
import { connectToPusher } from '../../../actions/sync';
import { triggerUpdate, getPod, addMemberToPod, launchPod } from '../../../actions/pods';
import { navTo } from '../../../actions/routing';
import PodLobby from './PodLobby';

const mapStateToProps = state => ({
  podId: getPodId(state),
  podMembers: getCurrentPodMembers(state),
  shouldUpdate: getShouldUpdatePod(state),
  userId: getProfileId(state),
  podCreatorId: getCurrentPodCreatorId(state)
});

const mapDispatchToProps = dispatch => ({
  connectToPusher: (channelId, type, action) => dispatch(connectToPusher(channelId, type, action)),
  triggerUpdate: () => dispatch(triggerUpdate),
  getPod: podId => dispatch(getPod(podId)),
  addMember: podId => dispatch(addMemberToPod(podId)),
  launchPod: podId => dispatch(launchPod(podId)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(PodLobby);

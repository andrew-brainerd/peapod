import { connect } from 'react-redux';
import { getProfileId } from '../../../../selectors/spotify';
import {
  getCurrentPodMembers,
  getCurrentPodActiveMembers,
  getCurrentPodCreatorId
} from '../../../../selectors/pods';
import PodMembers from './PodMembers';

const mapStateToProps = state => ({
  userId: getProfileId(state),
  memberList: getCurrentPodMembers(state),
  activeMemberList: getCurrentPodActiveMembers(state),
  podCreatorId: getCurrentPodCreatorId(state)
});

export default connect(mapStateToProps)(PodMembers);

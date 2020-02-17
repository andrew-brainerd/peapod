import { connect } from 'react-redux';
import { sendInvitation } from '../../../../actions/pods';
import InviteModal from './InviteModal';

const mapDispatchToProps = dispatch => ({
  sendInvitation: (podId, messageType, to) => dispatch(sendInvitation(podId, messageType, to))
});

export default connect(null, mapDispatchToProps)(InviteModal);

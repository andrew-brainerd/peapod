import { connect } from 'react-redux';
import { closeNotification } from '../../../actions/notify';
import Notification from './Notification';

const mapStateToProps = ({ notify }) => ({
  hidden: notify.hidden,
  message: notify.message
});

const mapDispatchToProps = dispatch => ({
  closeNotification: () => dispatch(closeNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

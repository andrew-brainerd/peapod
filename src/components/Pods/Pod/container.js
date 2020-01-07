import { connect } from 'react-redux';
import { getPathname } from '../../../selectors/routing';
import { getCurrentPod } from '../../../selectors/pods';
import { getCurrentUserId } from '../../../selectors/users';
import { getPod } from '../../../actions/pods';
import { navTo } from '../../../actions/routing';
import Pod from './Pod';

const mapStateToProps = state => ({
  pathname: getPathname(state),
  pod: getCurrentPod(state),
  userId: getCurrentUserId(state)
});

const mapDispatchToProps = dispatch => ({
  getPod: podId => dispatch(getPod(podId)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pod);

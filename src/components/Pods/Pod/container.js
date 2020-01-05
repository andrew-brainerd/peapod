import { connect } from 'react-redux';
import { getPathname } from '../../../selectors/routing';
import { getCurrentPod } from '../../../selectors/pods';
import { getPod } from '../../../actions/pods';
import Pod from './Pod';

const mapStateToProps = state => ({
  pathname: getPathname(state),
  pod: getCurrentPod(state)
});

const mapDispatchToProps = dispatch => ({
  getPod: podId => dispatch(getPod(podId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pod);

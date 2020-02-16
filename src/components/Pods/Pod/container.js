import { connect } from 'react-redux';
import { compose } from 'ramda';
import withSizes from 'react-sizes';
import { getPathname } from '../../../selectors/routing';
import { getCurrentPod } from '../../../selectors/pods';
import { getProfileId } from '../../../selectors/spotify';
import { getPod, sendInvitation } from '../../../actions/pods';
import { navTo } from '../../../actions/routing';
import Pod from './Pod';

const mapStateToProps = state => ({
  pathname: getPathname(state),
  pod: getCurrentPod(state),
  userId: getProfileId(state)
});

const mapSizesToProps = ({ height }) => ({ height });

const mapDispatchToProps = dispatch => ({
  getPod: podId => dispatch(getPod(podId)),
  navTo: path => dispatch(navTo(path)),
  sendInvitation: (podId, messageType, to) => dispatch(sendInvitation(podId, messageType, to))
});

export default compose(
  withSizes(mapSizesToProps),
  connect(mapStateToProps, mapDispatchToProps)
)(Pod);

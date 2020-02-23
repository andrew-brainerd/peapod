import { connect } from 'react-redux';
import { compose } from 'ramda';
import withSizes from 'react-sizes';
import { getPathname } from '../../../selectors/routing';
import { getCurrentPod, getIsPodOwner } from '../../../selectors/pods';
import { getProfileId } from '../../../selectors/spotify';
import { getIsSyncing } from '../../../selectors/sync';
import { getPod } from '../../../actions/pods';
import { connectClient } from '../../../actions/sync';
import { navTo } from '../../../actions/routing';
import Pod from './Pod';

const mapStateToProps = state => ({
  pathname: getPathname(state),
  pod: getCurrentPod(state),
  userId: getProfileId(state),
  isPodOwner: getIsPodOwner(state),
  isSyncing: getIsSyncing(state)
});

const mapSizesToProps = ({ height }) => ({ height });

const mapDispatchToProps = dispatch => ({
  getPod: podId => dispatch(getPod(podId)),
  connectClient: podId => dispatch(connectClient(podId)),
  navTo: path => dispatch(navTo(path))
});

export default compose(
  withSizes(mapSizesToProps),
  connect(mapStateToProps, mapDispatchToProps)
)(Pod);

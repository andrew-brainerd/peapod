import { connect } from 'react-redux';
import { compose } from 'ramda';
import withSizes from 'react-sizes';
import { getPathname } from '../../../selectors/routing';
import { getCurrentPod, getIsPodOwner, getIsConnectingToPod, getIsConnectedToPod } from '../../../selectors/pods';
import { getProfileId } from '../../../selectors/spotify';
import { getIsSyncing } from '../../../selectors/sync';
import { getPod, connectToPod, disconnectFromPod } from '../../../actions/pods';
import { connectClient } from '../../../actions/sync';
import Pod from './Pod';

const mapStateToProps = state => ({
  pathname: getPathname(state),
  pod: getCurrentPod(state),
  userId: getProfileId(state),
  isPodOwner: getIsPodOwner(state),
  isConnecting: getIsConnectingToPod(state),
  isConnected: getIsConnectedToPod(state),
  isSyncing: getIsSyncing(state)
});

const mapSizesToProps = ({ height }) => ({ height });

const mapDispatchToProps = dispatch => ({
  getPod: podId => dispatch(getPod(podId)),
  connectClient: podId => dispatch(connectClient(podId)),
  connectToPod: podId => dispatch(connectToPod(podId)),
  disconnectFromPod: podId => dispatch(disconnectFromPod(podId))
});

export default compose(
  withSizes(mapSizesToProps),
  connect(mapStateToProps, mapDispatchToProps)
)(Pod);

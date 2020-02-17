import { connect } from 'react-redux';
import { compose } from 'ramda';
import withSizes from 'react-sizes';
import { getPathname } from '../../../selectors/routing';
import { getCurrentPod, getIsPodOwner } from '../../../selectors/pods';
import { getProfileId } from '../../../selectors/spotify';
import { getPod, sendInvitation } from '../../../actions/pods';
import { navTo } from '../../../actions/routing';
import { nowPlayingLoaded } from '../../../actions/spotify';
import Pod from './Pod';

const mapStateToProps = state => ({
  pathname: getPathname(state),
  pod: getCurrentPod(state),
  userId: getProfileId(state),
  isPodOwner: getIsPodOwner(state)
});

const mapSizesToProps = ({ height }) => ({ height });

const mapDispatchToProps = dispatch => ({
  getPod: podId => dispatch(getPod(podId)),
  navTo: path => dispatch(navTo(path)),
  nowPlayingLoaded: nowPlaying => dispatch(nowPlayingLoaded(nowPlaying))
});

export default compose(
  withSizes(mapSizesToProps),
  connect(mapStateToProps, mapDispatchToProps)
)(Pod);

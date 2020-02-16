import { connect } from 'react-redux';
import { getAccessToken, getIsLoadingNowPlaying, getNowPlaying } from '../../../selectors/spotify';
import { getCurrentPodId, getIsPodOwner } from '../../../selectors/pods';
import { getMyNowPlaying } from '../../../actions/spotify';
import { addTrackToPlayHistory, getPod } from '../../../actions/pods';
import Player from './Player';

const mapStateToProps = state => ({
  hasAuth: !!getAccessToken(state),
  isLoading: getIsLoadingNowPlaying(state),
  nowPlaying: getNowPlaying(state),
  podId: getCurrentPodId(state),
  isPodOwner: getIsPodOwner(state)
});

const mapDispatchToProps = dispatch => ({
  getMyNowPlaying: () => dispatch(getMyNowPlaying()),
  addToPlayHistory: track => dispatch(addTrackToPlayHistory(track)),
  getPod: podId => dispatch(getPod(podId, false))
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);

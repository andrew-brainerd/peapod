import { connect } from 'react-redux';
import { getAccessToken, getIsLoadingNowPlaying, getNowPlaying } from '../../../selectors/spotify';
import { getMyNowPlaying } from '../../../actions/spotify';
import Player from './Player';

const mapStateToProps = state => ({
  hasAuth: !!getAccessToken(state),
  isLoading: getIsLoadingNowPlaying(state),
  nowPlaying: getNowPlaying(state)
});

const mapDispatchToProps = dispatch => ({
  getMyNowPlaying: () => dispatch(getMyNowPlaying())
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);

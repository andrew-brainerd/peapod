import { connect } from 'react-redux';
import { getAccessToken, getIsLoadingTracks } from '../../../selectors/spotify';
import { navTo } from '../../../actions/routing';
import Player from './Player';

const mapStateToProps = state => ({
  hasAuth: !!getAccessToken(),
  isLoading: getIsLoadingTracks(state)
});

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);

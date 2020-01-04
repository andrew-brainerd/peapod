import { connect } from 'react-redux';
import { getAccessToken, getAlbums } from '../../selectors/spotify';
import { getLogicAlbums } from '../../actions/spotify';
import { navTo } from '../../actions/routing';
import Spotify from './Spotify';

const mapStateToProps = state => ({
  hasAuth: !!getAccessToken(),
  albums: getAlbums(state)
});

const mapDispatchToProps = dispatch => ({
  getLogicAlbums: () => dispatch(getLogicAlbums()),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Spotify);

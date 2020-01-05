import { connect } from 'react-redux';
import { getQuery } from '../../../selectors/routing';
import { navTo } from '../../../actions/routing';
import SpotifyAuth from './SpotifyAuth';

const mapStateToProps = state => ({
  query: getQuery(state)
});

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyAuth);

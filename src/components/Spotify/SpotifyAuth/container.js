import { connect } from 'react-redux';
import { getQuery } from '../../../selectors/routing';
import { navTo } from '../../../actions/routing';
import { setAuth } from '../../../actions/spotify';
import SpotifyAuth from './SpotifyAuth';

const mapStateToProps = state => ({
  query: getQuery(state)
});

const mapDispatchToProps = dispatch => ({
  setAuth: auth => dispatch(setAuth(auth)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyAuth);

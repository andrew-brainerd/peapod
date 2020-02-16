import { connect } from 'react-redux';
import { getProfileId } from '../../selectors/spotify';
import { navTo } from '../../actions/routing';
import Home from './Home';

const mapStateToProps = state => ({
  userId: getProfileId(state)
});

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

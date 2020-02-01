import { connect } from 'react-redux';
import { play, pause } from '../../../../actions/spotify';
import Controls from './Controls';

const mapDispatchToProps = dispatch => ({
  play: uids => dispatch(play(uids)),
  pause: () => dispatch(pause())
});

export default connect(null, mapDispatchToProps)(Controls);

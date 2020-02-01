import { connect } from 'react-redux';
import { play, pause } from '../../../../actions/spotify';
import Controls from './Controls';

const mapDispatchToProps = dispatch => ({
  play: options => dispatch(play(options)),
  pause: () => dispatch(pause())
});

export default connect(null, mapDispatchToProps)(Controls);

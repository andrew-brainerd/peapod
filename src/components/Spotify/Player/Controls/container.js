import { connect } from 'react-redux';
import { play, pause } from '../../../../actions/spotify';
import { addTrackToPlayQueue } from '../../../../actions/pods';
import Controls from './Controls';

const mapDispatchToProps = dispatch => ({
  play: options => dispatch(play(options)),
  pause: () => dispatch(pause()),
  addToQueue: track => dispatch(addTrackToPlayQueue(track))
});

export default connect(null, mapDispatchToProps)(Controls);

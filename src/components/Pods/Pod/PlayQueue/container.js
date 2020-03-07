import { connect } from 'react-redux';
import { getPlayQueue, getIsPodOwner } from '../../../../selectors/pods';
import { play } from '../../../../actions/spotify';
import PlayQueue from './PlayQueue';

const mapStateToProps = state => ({
  queue: getPlayQueue(state),
  isPodOwner: getIsPodOwner(state)
});

const mapDispatchToProps = dispatch => ({
  play: options => dispatch(play(options))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayQueue);

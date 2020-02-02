import { connect } from 'react-redux';
import { getQueue } from '../../../../selectors/pods';
import { getPlayQueue } from '../../../../actions/pods';
import PlayQueue from './PlayQueue';

const mapStateToProps = state => ({
  queue: getQueue(state)
});

const mapDispatchToProps = dispatch => ({
  getQueue: () => dispatch(getPlayQueue())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayQueue);

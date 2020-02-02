import { connect } from 'react-redux';
import { getPlayQueue } from '../../../../selectors/pods';
import PlayQueue from './PlayQueue';

const mapStateToProps = state => ({
  queue: getPlayQueue(state)
});

export default connect(mapStateToProps)(PlayQueue);

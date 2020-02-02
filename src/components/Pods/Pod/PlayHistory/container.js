import { connect } from 'react-redux';
import { getPlayHistory } from '../../../../selectors/pods';
import PlayHistory from './PlayHistory';

const mapStateToProps = state => ({
  history: getPlayHistory(state)
});

export default connect(mapStateToProps)(PlayHistory);

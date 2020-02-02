import { connect } from 'react-redux';
import { getHistory } from '../../../../selectors/pods';
import { getPlayHistory } from '../../../../actions/pods';
import PlayHistory from './PlayHistory';

const mapStateToProps = state => ({
  history: getHistory(state)
});

const mapDispatchToProps = dispatch => ({
  getHistory: () => dispatch(getPlayHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayHistory);

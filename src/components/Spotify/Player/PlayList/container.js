import { connect } from 'react-redux';
import { getPlayList } from '../../../../selectors/pods';
import { getPod } from '../../../../actions/pods';
import PlayList from './PlayList';

const mapStateToProps = state => ({
  tracks: getPlayList(state)
});

const mapDispatchToProps = dispatch => ({
  getPod: podId => dispatch(getPod(podId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);

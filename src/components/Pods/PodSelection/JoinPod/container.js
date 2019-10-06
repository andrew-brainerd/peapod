import { connect } from 'react-redux';
import { getPodList } from '../../../../selectors/pods';
import { getPods } from '../../../../actions/pods';
import JoinPod from './JoinPod';

const mapStateToProps = state => ({
  pods: getPodList(state)
});

const mapDispatchToProps = dispatch => ({
  getPods: () => dispatch(getPods())
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinPod);

import { connect } from 'react-redux';
import { compose } from 'ramda';
import withSizes from 'react-sizes';
import { getPodList } from '../../selectors/pods';
import { getCurrentUserId } from '../../selectors/users';
import { getPods } from '../../actions/pods';
import { navTo } from '../../actions/routing';
import Pods from './Pods';

const mapStateToProps = state => ({
  pods: getPodList(state),
  userId: getCurrentUserId(state)
});

const mapSizesToProps = ({ height }) => ({ height });

const mapDispatchToProps = dispatch => ({
  getMyPods: userId => dispatch(getPods({ userId: userId })),
  navTo: path => dispatch(navTo(path))
});

export default compose(
  withSizes(mapSizesToProps),
  connect(mapStateToProps, mapDispatchToProps)
)(Pods);

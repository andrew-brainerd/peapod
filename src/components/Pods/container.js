import { connect } from 'react-redux';
import { compose } from 'ramda';
import withSizes from 'react-sizes';
import { getIsLoadingPods, getPodList } from '../../selectors/pods';
import { getProfileId } from '../../selectors/spotify';
import { getPods } from '../../actions/pods';
import { navTo } from '../../actions/routing';
import Pods from './Pods';

const mapStateToProps = state => ({
  isLoading: getIsLoadingPods(state),
  pods: getPodList(state),
  userId: getProfileId(state)
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

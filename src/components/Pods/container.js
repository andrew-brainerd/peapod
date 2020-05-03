import { connect } from 'react-redux';
import { compose } from 'ramda';
import withSizes from 'react-sizes';
import { getIsLoadingPods } from '../../selectors/pods';
import { navTo } from '../../actions/routing';
import Pods from './Pods';

const mapSizesToProps = ({ height }) => ({ height });

const mapStateToProps = state => ({
  isLoading: getIsLoadingPods(state)
});

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default compose(
  withSizes(mapSizesToProps),
  connect(mapStateToProps, mapDispatchToProps)
)(Pods);

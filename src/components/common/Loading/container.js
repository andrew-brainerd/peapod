import { connect } from 'react-redux';
import Loading from './Loading';

const mapStateToProps = ({ entertainment }) => ({
  isLoading: false
});

export default connect(mapStateToProps)(Loading);

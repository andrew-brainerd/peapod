import { connect } from 'react-redux';
import { getDevices } from '../../../selectors/spotify';
import { getMyDevices } from '../../../actions/spotify';
import Devices from './Devices';

const mapStateToProps = state => ({
  devices: getDevices(state)
});

const mapDispatchToProps = dispatch => ({
  getDevices: () => dispatch(getMyDevices())
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);

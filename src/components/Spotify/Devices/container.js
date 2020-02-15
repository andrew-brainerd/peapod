import { connect } from 'react-redux';
import { getDevices } from '../../../selectors/spotify';
import { getMyDevices, transferPlayback } from '../../../actions/spotify';
import Devices from './Devices';

const mapStateToProps = state => ({
  devices: getDevices(state)
});

const mapDispatchToProps = dispatch => ({
  getDevices: () => dispatch(getMyDevices()),
  selectDevice: (deviceIds, shouldPlay) => dispatch(transferPlayback([deviceIds], shouldPlay))
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);

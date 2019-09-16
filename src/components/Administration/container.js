import { connect } from 'react-redux';
import { createUser } from '../../actions/users';
import Administration from './Administration';

const mapDispatchToProps = dispatch => ({
  createUser: (user, password) => dispatch(createUser(user, password))
});

export default connect(null, mapDispatchToProps)(Administration);

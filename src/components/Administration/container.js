import { connect } from 'react-redux';
import { createUser } from '../../actions/users';
import Administration from './Administration';

const mapStateToProps = ({ users }) => ({
  createUserError: users.createUserError,
  user: users.user
});

const mapDispatchToProps = dispatch => ({
  createUser: (user, password) => dispatch(createUser(user, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Administration);

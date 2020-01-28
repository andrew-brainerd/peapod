import { connect } from 'react-redux';
import { search } from '../../../actions/spotify';
import SearchBar from './SearchBar';

const mapDispatchToProps = dispatch => ({
  search: searchText => dispatch(search(searchText))
});

export default connect(null, mapDispatchToProps)(SearchBar);

import { connect } from 'react-redux';
import ActionComponent from '../ActionComponent02';
import { setLoading, resetLoading } from '../actions/loadingActions';
import { setUser } from '../actions/userActions';
import { setCollection } from '../actions/collectionActions01';
import { setAge } from '../actions/collectionActions02';

const mapDispatchToProps = {
  setLoading,
  resetLoading,
  setUser,
  setAge,
  setCollection,
};

export default connect(null, mapDispatchToProps)(ActionComponent);

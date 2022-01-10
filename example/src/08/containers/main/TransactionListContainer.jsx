import { connect } from 'react-redux';
import TransactionList from '../../components/main/TransactionList';
import {
  requestTransactionList,
  FETCH_TRANSACTION_LIST,
} from '../../actions/transasctionPackActions';

const mapStateToProps = (state) => {
  const { ids, entities, loadingState } = state.transactions;
  const loading = loadingState[FETCH_TRANSACTION_LIST];
  const transactions = ids.map((id) => entities[id]);
  return { transactions, loading };
};
const mapDispatchToProps = {
  requestTransactionList,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);

import { connect } from 'react-redux';
import TransactionPagination from '../../components/main/TransactionPagination';
import { requestTransactionList } from '../../actions/transasctionPackActions';
import { loadingStateSelector } from '../../selectors/transactionSelectors';

const mapStateToProps = (state) => {
  const { pagination } = state.transactions;
  const { number } = pagination;
  return { pageNumber: number || 1, loading: loadingStateSelector(state) };
};
const mapDispatchToProps = {
  requestTransactionList,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPagination);

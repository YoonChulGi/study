import { connect } from 'react-redux';
import TransactionList from '../../components/main/TransactionList';

import { requestTransactionList } from '../../actions/transasctionPackActions';
import {
  transactionListSelector,
  loadingStateSelector,
} from '../../selectors/transactionSelectors';

const mapStateToProps = (state) => {
  return { transactions: transactionListSelector(state), loading: loadingStateSelector(state) };
};
const mapDispatchToProps = {
  requestTransactionList,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);

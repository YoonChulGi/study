import { connect } from 'react-redux';
import TransactionSearchFilter from '../../components/main/TransactionSearchFilter';
// import { requestTransactionList } from '../../actions/transactionActions';
import { requestTransactionList } from '../../actions/transasctionPackActions';

export default connect(null, { requestTransactionList })(TransactionSearchFilter);

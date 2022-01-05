import { connect } from 'react-redux';
import TransactionSearchFilter from './TransactionSearchFilter';
import { setTransactionList } from '../../actions/transactionActions';

export default connect(null, { setTransactionList })(TransactionSearchFilter);

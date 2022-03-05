import { connect } from "react-redux";
import TransactionSearchFilter from "../../components/main/TransactionSearchFilter";

const mapStateToProps = (state) => ({
  initValues: state.searchFilter.params,
});

export default connect(mapStateToProps)(TransactionSearchFilter);

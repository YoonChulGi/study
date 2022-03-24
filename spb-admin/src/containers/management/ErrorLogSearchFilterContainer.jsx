import { connect } from "react-redux";
import ErrorLogSearchFilter from "../../components/management/ErrorLogSearchFilter";

const mapStateToProps = (state) => ({
  initValues: state.searchErrorLogFilter.params,
});

export default connect(mapStateToProps)(ErrorLogSearchFilter);

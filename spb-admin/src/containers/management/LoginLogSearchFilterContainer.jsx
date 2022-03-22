import { connect } from "react-redux";
import LoginLogSearchFilter from "../../components/management/LoginLogSearchFilter";

const mapStateToProps = (state) => ({
  initValues: state.searchLoginLogFilter.params,
});

export default connect(mapStateToProps)(LoginLogSearchFilter);

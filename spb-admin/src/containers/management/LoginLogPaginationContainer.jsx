import { connect } from "react-redux";
import LoginLogPagination from "../../components/management/LoginLogPagination";
import { requestLoginLogList } from "../../actions/loginLogPackActions";

import { loginLogListLoadingStateSelector } from "../../selectors/loginLogSelectors";

const mapStateToProps = (state) => {
  const { pagination, indexes } = state["/api/loginLog"];
  const { number, size } = pagination;

  return {
    searchParams: state.searchLoginLogFilter.params,
    hasNext: indexes.length === size,
    pageNumber: number || 1,
    loading: loginLogListLoadingStateSelector(state),
  };
};

const mapDispatchToProps = {
  requestLoginLogList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginLogPagination);

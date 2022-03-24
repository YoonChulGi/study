import { connect } from "react-redux";
import ErrorLogPagination from "../../components/management/ErrorLogPagination";
import { requestErrorLogList } from "../../actions/errorLogPackActions";

import { errorLogListLoadingStateSelector } from "../../selectors/errorLogSelectors";

const mapStateToProps = (state) => {
  const { pagination, indexes } = state["/api/errorLog"];
  const { number, size } = pagination;

  return {
    searchParams: state.searchErrorLogFilter.params,
    hasNext: indexes.length === size,
    pageNumber: number || 1,
    loading: errorLogListLoadingStateSelector(state),
  };
};

const mapDispatchToProps = {
  requestErrorLogList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorLogPagination);

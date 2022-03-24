import { connect } from "react-redux";

import ErrorLogList from "../../components/management/ErrorLogList";
import { requestErrorLogList } from "../../actions/errorLogPackActions";
import {
  errorLogListSelector,
  errorLogListLoadingStateSelector,
} from "../../selectors/errorLogSelectors";

const mapStateToProps = (state) => {
  return {
    errorLogList: errorLogListSelector(state),
    loading: errorLogListLoadingStateSelector(state),
  };
};
const mapDispatchToProps = {
  requestErrorLogList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorLogList);

import { connect } from "react-redux";

import LoginLogList from "../../components/management/LoginLogList";
import { requestLoginLogList } from "../../actions/loginLogPackActions";
import {
  loginLogListSelector,
  loginLogListLoadingStateSelector,
} from "../../selectors/loginLogSelectors";

const mapStateToProps = (state) => {
  return {
    loginLogList: loginLogListSelector(state),
    loading: loginLogListLoadingStateSelector(state),
  };
};
const mapDispatchToProps = {
  requestLoginLogList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginLogList);

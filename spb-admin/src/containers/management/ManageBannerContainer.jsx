import { connect } from "react-redux";
import ManageBanner from "../../components/management/ManageBanner";
// import { loginAdmin } from "../../actions/adminActions";
// import { adminLoginLoadingStateSelector } from "../../selectors/adminSelectors";

export default connect(
  (state) => ({
    // loading: adminLoginLoadingStateSelector(state),
  })
  //   { loginAdmin }
)(ManageBanner);

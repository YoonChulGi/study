import { connect } from "react-redux";
import AppNav from "../components/AppNav";
import { logoutAdmin } from "../actions/adminActions";
// import { adminLoginLoadingStateSelector } from "../../selectors/adminSelectors";

export default connect(
  (state) => ({
    // loading: adminLoginLoadingStateSelector(state),
  }),
  { logoutAdmin }
)(AppNav);

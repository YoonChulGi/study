import { connect } from "react-redux";
import Login from "../../components/login/Login";
import { loginAdmin } from "../../actions/adminActions";
// import { adminLoginLoadingStateSelector } from "../../selectors/adminSelectors";

export default connect(
  (state) => ({
    // loading: adminLoginLoadingStateSelector(state),
  }),
  { loginAdmin }
)(Login);

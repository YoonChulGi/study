import { connect } from "react-redux";
import AddAdmin from "../../components/signup/AddAdmin";
import { createAdmin } from "../../actions/adminActions";
import { adminCreateLoadingStateSelector } from "../../selectors/adminSelectors";

export default connect(
  (state) => ({
    loading: adminCreateLoadingStateSelector(state),
  }),
  { createAdmin }
)(AddAdmin);

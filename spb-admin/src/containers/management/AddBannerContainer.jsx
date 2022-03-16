import { connect } from "react-redux";
import AddBanner from "../../components/management/AddBanner";
import { uploadBanner } from "../../actions/bannerActions";
// import { adminLoginLoadingStateSelector } from "../../selectors/adminSelectors";

export default connect(
  (state) => ({
    // loading: adminLoginLoadingStateSelector(state),
  }),
  { uploadBanner }
)(AddBanner);

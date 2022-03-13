import { connect } from "react-redux";
import ManageBanner from "../../components/management/ManageBanner";
import { uploadBanner } from "../../actions/bannerActions";
// import { adminLoginLoadingStateSelector } from "../../selectors/adminSelectors";

export default connect(
  (state) => ({
    // loading: adminLoginLoadingStateSelector(state),
  }),
  { uploadBanner }
)(ManageBanner);

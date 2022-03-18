import { connect } from "react-redux";
import UpdateBanner from "../../components/management/UpdateBanner";
import { updateBanner } from "../../actions/bannerPackActions";
// import { adminLoginLoadingStateSelector } from "../../selectors/adminSelectors";

export default connect(
  (state) => ({
    // loading: adminLoginLoadingStateSelector(state),
  }),
  { updateBanner }
)(UpdateBanner);

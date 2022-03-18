import { connect } from "react-redux";
import DeleteBanner from "../../components/management/DeleteBanner";
import { deleteBanner } from "../../actions/bannerPackActions";
// import { adminLoginLoadingStateSelector } from "../../selectors/adminSelectors";

export default connect(
  (state) => ({
    // loading: adminLoginLoadingStateSelector(state),
  }),
  { deleteBanner }
)(DeleteBanner);

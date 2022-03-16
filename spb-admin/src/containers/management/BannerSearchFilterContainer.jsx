import { connect } from "react-redux";
import BannerSearchFilter from "../../components/management/BannerSearchFilter";

const mapStateToProps = (state) => ({
  initValues: state.searchBannerFilter.params,
});

export default connect(mapStateToProps)(BannerSearchFilter);

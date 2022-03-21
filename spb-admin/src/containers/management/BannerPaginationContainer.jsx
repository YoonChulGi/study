import { connect } from "react-redux";
import BannerPagination from "../../components/management/BannerPagination";
import { requestBannerList } from "../../actions/bannerPackActions";

import { bannerListLoadingStateSelector } from "../../selectors/bannerSelectors";

const mapStateToProps = (state) => {
  const { pagination, indexes } = state["/api/banner"];
  const { number, size } = pagination;

  return {
    searchParams: state.searchBannerFilter.params,
    hasNext: indexes.length === size,
    pageNumber: number || 1,
    loading: bannerListLoadingStateSelector(state),
  };
};

const mapDispatchToProps = {
  requestBannerList,
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerPagination);

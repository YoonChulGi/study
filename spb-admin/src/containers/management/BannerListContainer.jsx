import { connect } from "react-redux";
// import TransactionList from "../../components/main/TransactionList";
import BannerList from "../../components/management/BannerList";

// import { requestTransactionList } from "../../actions/transactionPackActions";
import { requestBannerList } from "../../actions/bannerPackActions";

// import {
//   transactionListSelector,
//   transactionListLoadingStateSelector,
// } from "../../selectors/transactionSelectors";

import {
  bannerListSelector,
  bannerListLoadingStateSelector,
} from "../../selectors/bannerSelectors";

const mapStateToProps = (state) => {
  return {
    // transactions: transactionListSelector(state),
    // loading: transactionListLoadingStateSelector(state),
    bannerList: bannerListSelector(state),
    loading: bannerListLoadingStateSelector(state),
  };
};
const mapDispatchToProps = {
  requestBannerList,
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerList);

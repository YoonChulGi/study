import { SET_FILTER } from "../actions/searchFilterActions";
import {
  requestTransactionList,
  resetTransactionList,
} from "../actions/transactionPackActions";
// import {
//   requestBannerList,
//   resetBannerList,
// } from "../actions/bannerPackActions";

export default (store) => (nextRunner) => (action) => {
  const { type, payload } = action;
  const result = nextRunner(action);

  if (type === SET_FILTER) {
    const { params } = payload || {};
    store.dispatch(resetTransactionList());
    store.dispatch(requestTransactionList(params));
    // store.dispatch(resetBannerList);
    // store.dispatch(requestBannerList());
  }
  return result;
};

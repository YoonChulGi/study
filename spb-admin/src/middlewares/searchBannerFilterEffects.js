import { SET_BANNER_FILTER } from "../actions/searchBannerFilterActions";

import {
  requestBannerList,
  resetBannerList,
} from "../actions/bannerPackActions";

export default (store) => (nextRunner) => (action) => {
  const { type, payload } = action;
  const result = nextRunner(action);

  if (type === SET_BANNER_FILTER) {
    const { params } = payload || {};
    store.dispatch(resetBannerList());
    store.dispatch(requestBannerList(params));
    // store.dispatch(resetBannerList);
    // store.dispatch(requestBannerList());
  }
  return result;
};

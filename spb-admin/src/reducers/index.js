import notification from "./notificationReducer";
import createReducers from "../api-redux-pack/createReducers";
import searchFilter from "./searchFilterReducer";
import searchBannerFilter from "./searchBannerFilterReducer";
import router from "./routerReducer";

const apiReducers = createReducers(
  "transactions",
  "api/addAdmin",
  "/api/banner"
);
export default {
  ...apiReducers,
  notification,
  searchFilter,
  searchBannerFilter,
  router,
};

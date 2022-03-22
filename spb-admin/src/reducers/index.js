import notification from "./notificationReducer";
import createReducers from "../api-redux-pack/createReducers";
import searchFilter from "./searchFilterReducer";
import searchBannerFilter from "./searchBannerFilterReducer";
import searchLoginLogFilter from "./searchLoginLogFilterReducer";
import router from "./routerReducer";

const apiReducers = createReducers(
  "transactions",
  "api/addAdmin",
  "/api/banner",
  "/api/loginLog"
);
export default {
  ...apiReducers,
  notification,
  searchFilter,
  searchBannerFilter,
  searchLoginLogFilter,
  router,
};

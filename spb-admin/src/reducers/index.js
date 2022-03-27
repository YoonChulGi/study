import notification from "./notificationReducer";
import createReducers from "../api-redux-pack/createReducers";
import searchFilter from "./searchFilterReducer";
import searchBannerFilter from "./searchBannerFilterReducer";
import searchLoginLogFilter from "./searchLoginLogFilterReducer";
import searchErrorLogFilter from "./searchErrorLogFilterReducer";
import router from "./routerReducer";

const apiReducers = createReducers(
  "transactions",
  "api/addAdmin",
  "/api/banner",
  "/api/loginLog",
  "/api/errorLog",
  "/api/overview"
);
export default {
  ...apiReducers,
  notification,
  searchFilter,
  searchBannerFilter,
  searchLoginLogFilter,
  searchErrorLogFilter,
  router,
};

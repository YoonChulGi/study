import notification from "./notificationReducer";
import searchFilter from "./searchFilterReducer";
import createReducers from "../api-redux-pack/createReducers";

const apiReducers = createReducers("transactions", "api/addAdmin");
export default {
  ...apiReducers,
  notification,
  searchFilter,
};

import notification from "./notificationReducer";
import createReducers from "../api-redux-pack/createReducers";
import searchFilter from "./searchFilterReducer";

const apiReducers = createReducers("transactions", "api/addAdmin");
export default {
  ...apiReducers,
  notification,
  searchFilter,
};

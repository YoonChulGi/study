import createSelectors from "../api-redux-pack/createSelectors";

export const {
  loginLogSelector: loginLogListSelector,
  loginLogLoadingStateSelector: loginLogListLoadingStateSelector,
  paginationSelector,
} = createSelectors("/api/loginLog");

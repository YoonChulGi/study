import createSelectors from "../api-redux-pack/createSelectors";

export const {
  // test
  loginLogSelector: loginLogListSelector,
  loginLogLoadingStateSelector: loginLogListLoadingStateSelector,
  paginationSelector,
} = createSelectors("/api/loginLog");

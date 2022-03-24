import createSelectors from "../api-redux-pack/createSelectors";

export const {
  errorLogSelector: errorLogListSelector,
  errorLogLoadingStateSelector: errorLogListLoadingStateSelector,
  paginationSelector,
} = createSelectors("/api/errorLog");

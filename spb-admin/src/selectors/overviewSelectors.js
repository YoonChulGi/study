import createSelectors from "../api-redux-pack/createSelectors";

export const {
  overviewSelector: overviewListSelector,
  // overviewLoadingStateSelector: overviewListLoadingStateSelector,
  // paginationSelector,
} = createSelectors("/api/overview");

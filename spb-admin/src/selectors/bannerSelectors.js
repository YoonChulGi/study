import createSelectors from "../api-redux-pack/createSelectors";

export const {
  //   resourceSelector: transactionsSelector,
  bannerSelector: bannerListSelector,
  bannerLoadingStateSelector: bannerListLoadingStateSelector,
  //   createLoadingStateSelector: transactionCreateLoadingStateSelector,
  paginationSelector,
} = createSelectors("/api/banner");

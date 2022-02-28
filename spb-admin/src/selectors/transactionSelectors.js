import createSelectors from "../api-redux-pack/createSelectors";

export const {
  resourceSelector: transactionsSelector,
  collectionSelector: transactionListSelector,
  collectionLoadingStateSelector: transactionListLoadingStateSelector,
  // createLoadingStateSelector: transactionCreateLoadingStateSelector,
} = createSelectors("transactions");

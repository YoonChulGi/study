import createSelectors from "../../11/api-redux-pack/createSelectors";

export const {
    resourceSelector: transactionsSelector,
    collectionSelector: transactionListSelector,
    collectionLoadingStateSelector: transactionListLoadingStateSelector,
    createLoadingStateSelector: transactionCreateLoadingStateSelector,
    paginationSelector,
} = createSelectors('transactions');
import Api from "../Api";

export const LOADING_TRANSACTION_LIST = "transaction/LOADING_TRANSACTION_LIST";
export const SET_TRANSACTION_LIST = "transaction/SET_TRANSACTION_LIST";
export const SET_ERROR = "transaction/SET_ERROR";

export function loading() {
  return {
    type: LOADING_TRANSACTION_LIST,
  };
}

export function setError(errorMessage) {
  return {
    type: SET_ERROR,
    payload: { errorMessage },
  };
}

export function setTransactionList(transactions) {
  return {
    type: SET_TRANSACTION_LIST,
    payload: transactions,
  };
}

export function requestTransactionList(params) {
  return (dispatch) => {
    dispatch(loading());
    Api.get("/api/checkout", { params }).then(
      ({ data }) => dispatch(setTransactionList(data.payload)),
      (error) => {
        dispatch(setError(error.message));
      }
    );
  };
}

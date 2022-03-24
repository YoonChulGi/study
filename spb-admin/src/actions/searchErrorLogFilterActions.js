export const SET_ERROR_LOG_FILTER = "searchErrorLogFilter/SET_ERROR_LOG_FILTER";

export function setErrorLogFilter(params) {
  return {
    type: SET_ERROR_LOG_FILTER,
    payload: { params },
  };
}

export const SET_LOGIN_LOG_FILTER = "searchLoginLogFilter/SET_LOGIN_LOG_FILTER";

export function setLoginLogFilter(params) {
  return {
    type: SET_LOGIN_LOG_FILTER,
    payload: { params },
  };
}

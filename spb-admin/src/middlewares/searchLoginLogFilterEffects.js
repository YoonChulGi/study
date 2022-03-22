import { SET_LOGIN_LOG_FILTER } from "../actions/searchLoginLogFilterActions";

import {
  requestLoginLogList,
  resetLoginLogList,
} from "../actions/loginLogPackActions";

export default (store) => (nextRunner) => (action) => {
  const { type, payload } = action;
  const result = nextRunner(action);

  if (type === SET_LOGIN_LOG_FILTER) {
    const { params } = payload || {};
    store.dispatch(resetLoginLogList());
    store.dispatch(requestLoginLogList(params));
  }
  return result;
};

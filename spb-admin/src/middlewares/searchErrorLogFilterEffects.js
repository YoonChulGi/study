import { SET_ERROR_LOG_FILTER } from "../actions/searchErrorLogFilterActions";

import {
  requestErrorLogList,
  resetErrorLogList,
} from "../actions/errorLogPackActions";

export default (store) => (nextRunner) => (action) => {
  const { type, payload } = action;
  const result = nextRunner(action);

  if (type === SET_ERROR_LOG_FILTER) {
    const { params } = payload || {};
    store.dispatch(resetErrorLogList());
    store.dispatch(requestErrorLogList(params));
  }
  return result;
};

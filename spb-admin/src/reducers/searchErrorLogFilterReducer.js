import { SET_ERROR_LOG_FILTER } from "../actions/searchErrorLogFilterActions";

const initState = {
  params: {},
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ERROR_LOG_FILTER: {
      const { params } = payload;
      return { ...state, params };
    }
    default:
      return state;
  }
};

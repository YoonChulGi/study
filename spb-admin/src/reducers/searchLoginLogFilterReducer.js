import { SET_LOGIN_LOG_FILTER } from "../actions/searchLoginLogFilterActions";

const initState = {
  params: {},
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOGIN_LOG_FILTER: {
      const { params } = payload;
      return { ...state, params };
    }
    default:
      return state;
  }
};

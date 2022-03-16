import { SET_BANNER_FILTER } from "../actions/searchBannerFilterActions";

const initState = {
  params: {},
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_BANNER_FILTER: {
      const { params } = payload;
      return { ...state, params };
    }
    default:
      return state;
  }
};

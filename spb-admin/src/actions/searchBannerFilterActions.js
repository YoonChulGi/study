export const SET_BANNER_FILTER = "searchBannerFilter/SET_BANNER_FILTER";

export function setBannerFilter(params) {
  return {
    type: SET_BANNER_FILTER,
    payload: { params },
  };
}

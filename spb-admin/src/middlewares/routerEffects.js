import { SET_LOCATION } from "../actions/routerActions";
import { setFilter } from "../actions/searchFilterActions";
import { setBannerFilter } from "../actions/searchBannerFilterActions";
import { setLoginLogFilter } from "../actions/searchLoginLogFilterActions";
import { setErrorLogFilter } from "../actions/searchErrorLogFilterActions";

const isLoggedIn = sessionStorage.getItem("isLoggedIn");

function parse(qs) {
  const queryString = qs.substr(1);
  const chunks = queryString.split("&");
  return chunks
    .map((chunk) => chunk.split("="))
    .reduce(
      (result, [key, value]) => ({
        ...result,
        [key]: value,
      }),
      {}
    );
}

export default (store) => (nextRunner) => (action) => {
  const { type, payload } = action;
  const result = nextRunner(action);
  if (type === SET_LOCATION) {
    const { pathname, search } = payload.location;
    const parsedSearchParams = parse(search);

    if (pathname === "/" && isLoggedIn === "true") {
      if (
        !parsedSearchParams.search_type ||
        parsedSearchParams.search_type === "transaction"
      ) {
        store.dispatch(setFilter(parsedSearchParams));
      }
      if (
        parsedSearchParams.search_type &&
        parsedSearchParams.search_type === "banner"
      ) {
        store.dispatch(setBannerFilter(parsedSearchParams));
      }
      if (
        parsedSearchParams.search_type &&
        parsedSearchParams.search_type === "loginLog"
      ) {
        store.dispatch(setLoginLogFilter(parsedSearchParams));
      }
      if (
        parsedSearchParams.search_type &&
        parsedSearchParams.search_type === "errorLog"
      ) {
        store.dispatch(setErrorLogFilter(parsedSearchParams));
      }
    }
  }
  return result;
};

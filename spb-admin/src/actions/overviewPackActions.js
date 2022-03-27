import createActions from "../api-redux-pack/createActions";

const { overviewList } = createActions("/api/overview");
const isLoggedIn = sessionStorage.getItem("isLoggedIn");

export function requestOverviewList(params, _page = 1) {
  if (isLoggedIn === "true") {
    return overviewList();
  }
}

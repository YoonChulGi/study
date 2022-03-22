import createActions from "../api-redux-pack/createActions";

const { loginLogList, resetLoginLog } = createActions("/api/loginLog");
const PAGE_SIZE = 10;
const isLoggedIn = sessionStorage.getItem("isLoggedIn");

export const resetLoginLogList = resetLoginLog;
export function requestLoginLogList(params, _page = 1) {
  if (isLoggedIn === "true") {
    const meta = {
      pageNumber: _page,
      pageSize: PAGE_SIZE,
      notification: {
        success: "로그인 로그를 최신 정보로 업데이트했습니다.",
        error: "로그인 로그를 갱신하는 중에 문제가 발생했습니다.",
      },
    };
    return loginLogList(
      {
        ...params,
        _page,
        _limit: PAGE_SIZE,
      },
      meta
    );
  }
}

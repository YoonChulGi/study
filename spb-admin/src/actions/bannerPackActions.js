import createActions from "../api-redux-pack/createActions";

const { bannerList, resetBanner } = createActions("/api/banner");
const PAGE_SIZE = 10;
const isLoggedIn = sessionStorage.getItem("isLoggedIn");
export const resetBannerList = resetBanner;
export function requestBannerList(params, _page = 1) {
  if (isLoggedIn === "true") {
    const meta = {
      pageNumber: _page,
      pageSize: PAGE_SIZE,
      notification: {
        success: "배너 정보를 최신 정보로 업데이트했습니다.",
        error: "배너 정보를 갱신하는 중에 문제가 발생했습니다.",
      },
    };
    return bannerList(
      {
        ...params,
        _page,
        _limit: PAGE_SIZE,
      },
      meta
    );
  }
}

// export function createTransaction(data, onComplete) {
//   const meta = {
//       onSuccess: onComplete,
//       notification: {
//           success: '거래가 성공적으로 완료되었습니다',
//       },
//   };
//   return create(data, {}, meta);
// }

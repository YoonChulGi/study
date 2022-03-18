import createActions from "../api-redux-pack/createActions";

const { upload } = createActions("/api/uploadBanner");
const { update } = createActions("/api/updateBanner");
// export function createAdmin(data, onComplete) {
//   return upload(
//     data,
//     {},
//     {
//       notification: {
//         success: "관리자 추가가 성공적으로 완료되었습니다.",
//         error: "관리자 추가에 실패했습니다.",
//       },
//       onSuccess: onComplete,
//       onFailure: onComplete,
//     }
//   );
// }

// export function loginAdmin(data) {
//   return login(
//     data,
//     {},
//     {
//       notification: {
//         success: "관리자 로그인 성공",
//         error: "관리자 로그인 실패",
//       },
//     }
//   );
// }

export function uploadBanner(data, onComplete) {
  return upload(
    data,
    {},
    {
      notification: {
        success: "배너 광고 등록이 성공적으로 완료되었습니다.",
        error: "배너 광고 등록에 실패했습니다.",
      },
      onSuccess: onComplete,
      onFailure: onComplete,
    }
  );
}

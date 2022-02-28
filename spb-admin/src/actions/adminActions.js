import createActions from "../api-redux-pack/createActions";

const { create } = createActions("/api/addAdmin");
export function createAdmin(data, onComplete) {
  return create(
    data,
    {},
    {
      notification: { success: "관리자 추가가 성공적으로 완료되었습니다." },
      onSuccess: onComplete,
    }
  );
}

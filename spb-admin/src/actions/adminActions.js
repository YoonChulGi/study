import createActions from "../api-redux-pack/createActions";

const { create } = createActions("/api/addAdmin");
const { login } = createActions("/api/loginAdmin");
export function createAdmin(data, onComplete) {
  return create(
    data,
    {},
    {
      notification: {
        success: "관리자 추가가 성공적으로 완료되었습니다.",
        error: "관리자 추가에 실패했습니다.",
      },
      onSuccess: onComplete,
      onFailure: onComplete,
    }
  );
}

export function loginAdmin(data, onComplete) {
  return login(
    data,
    {},
    {
      onSuccess: onComplete,
      onFailure: onComplete,
    }
  );
}
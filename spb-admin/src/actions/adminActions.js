import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../api-redux-pack/actionTypes";
import createActions from "../api-redux-pack/createActions";

const { create } = createActions("/api/addAdmin");
const { login, logout } = createActions("/api/loginAdmin");
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

export function loginAdmin(data) {
  return login(
    data,
    {},
    {
      notification: {
        success: "관리자 로그인 성공",
        error: "관리자 로그인 실패",
      },
    }
  );
}

export function loginSuccess(email) {
  return {
    type: LOGIN_SUCCESS,
    payload: { email },
  };
}

export function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  };
}

export function logoutAdmin() {
  return logout();
}

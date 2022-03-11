import { KEY, LIFECYCLE } from "redux-pack";
import { LOGIN, LOGOUT } from "../api-redux-pack/actionTypes";

export default (store) => (nextRunner) => (action) => {
  const { type, payload, meta } = action;
  const result = nextRunner(action);

  if (type && type === LOGIN) {
    if (meta && meta[KEY.LIFECYCLE] === LIFECYCLE.SUCCESS) {
      if (payload && payload.data && payload.data.code === 200) {
        const { email } = payload.data;
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("email", email);
        setTimeout(() => {
          document.location.reload();
        }, 3000);
      }
    }
  } else if (type && type === LOGOUT) {
    if (meta && meta[KEY.LIFECYCLE] === LIFECYCLE.SUCCESS) {
      if (payload && payload.data && payload.data.code === 200) {
        sessionStorage.setItem("isLoggedIn", false);
        sessionStorage.setItem("email", null);
        setTimeout(() => {
          document.location.reload();
        }, 3000);
      }
    }
  }
  return result;
};

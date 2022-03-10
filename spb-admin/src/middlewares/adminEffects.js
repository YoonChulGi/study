import { KEY, LIFECYCLE } from "redux-pack";
import { LOGIN } from "../api-redux-pack/actionTypes";

export default (store) => (nextRunner) => (action) => {
  const { type, payload, meta } = action;
  const result = nextRunner(action);
  if (type && type === LOGIN) {
    if (meta && meta[KEY.LIFECYCLE] === LIFECYCLE.SUCCESS) {
      if (payload && payload.data && payload.data.code === 200) {
        const { email } = payload.data;
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("email", email);
        document.location.reload();
      }
    }
  }
  return result;
};

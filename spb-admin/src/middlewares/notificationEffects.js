import { KEY, LIFECYCLE } from "redux-pack";
import {
  SHOW_NOTIFICATION,
  showMessage,
  hideMessage,
} from "../actions/notificationActions";
import { debounce } from "../debouce";
const debounceRunner = debounce((action) => action(), 4000);

export default (store) => (nextRunner) => (action) => {
  const { type, payload, meta } = action;

  const result = nextRunner(action);
  if (meta && meta.notification) {
    const { success, error } = meta.notification;
    if (success && meta[KEY.LIFECYCLE] === LIFECYCLE.SUCCESS) {
      console.log(payload);
      const { message } = payload.data ? payload.data : {};
      // console.dir(success);
      store.dispatch(showMessage(message || success));
    } else if (error && meta[KEY.LIFECYCLE] === LIFECYCLE.FAILURE) {
      const { errorMessage } = payload.response ? payload.response.data : {};
      // console.dir(payload);
      // console.dir(errorMessage);
      // console.dir(error);
      store.dispatch(showMessage(errorMessage || error, true));
    }
  } else if (type === SHOW_NOTIFICATION) {
    const hide = () => store.dispatch(hideMessage());

    debounceRunner(hide);
  }
  return result;
};

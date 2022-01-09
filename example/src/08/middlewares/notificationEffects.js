import { KEY, LIFECYCLE } from 'redux-pack';
import { SHOW_NOTIFICATION, showMessage, hideMessage } from '../actions/notificationActions';

export default store => nextRunner => action => {
    const { type, meta } = action;
    if(meta && meta.notification) {
        const { success, error } = meta.notification;
        if(success && meta[KEY.LIFECYCLE] === LIFECYCLE.SUCCESS) {
            store.dispatch(showMessage(success));
        } else if(error && meta[KEY.LIFECYCLE] === LIFECYCLE.FAILURE) {
            store.dispatch(showMessage(error,true));
        }
    }
    return nextRunner(action);
}
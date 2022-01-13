import notification from './notificationReducer';
import createReducers from '../../11/api-redux-pack/createReducers';
import searchFilter from './searchFilterReducer';
import router from './routerReducers';

const apiReducers = createReducers('transactions', 'users');
export default {
    ...apiReducers,
    notification,
    searchFilter,
    router,
};
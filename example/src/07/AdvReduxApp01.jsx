import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore'; // 기존 ReduxApp 클래스에 있던 리듀서 코드가 configureStore()로 대체됨
class AdvReduxApp extends PureComponent {
  store = configureStore({ loading: false });

  componentDidMount() {
    this.store.dispatch({
      type: 'SET_LOADING',
      payload: true,
    });
    this.store.dispatch({
      type: 'RESET_LOADING',
    });
    this.store.dispatch({
      type: 'SET_USER',
      payload: { name: 'Park', age: 20 },
    });
  }

  render() {
    return <Provider store={this.store}>리덕스 예제</Provider>;
  }
}
export default AdvReduxApp;

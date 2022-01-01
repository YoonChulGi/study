import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const reducer = (state, action) => {
  const { type, payload } = action; // 구조 분해 할당으로 { type, payload }를 분해
  switch (
    type // switch 구문으로 액션 타입에 맞는 리듀서 작업을 실행합니다.
  ) {
    case 'SET_LOADING': {
      return {
        ...state,
        loading: payload,
      };
    }
    case 'RESET_LOADING': {
      // type이 RESET_LOADING인 경우 스토어 데이터의 loading값을 무조건 false로 변경
      return { ...state, loading: false };
    }
    case 'SET_USER': {
      // type이 SET_USER인 경우 payload의 값으로 user의 값을 변경합니다.
      return {
        ...state,
        user: payload,
      };
    }
    default:
      return state;
  }
};

class ReduxApp extends PureComponent {
  store = createStore(
    reducer,
    { loading: false, name: 'Chul' },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  componentDidMount() {
    this.store.dispatch({
      type: 'SET_LOADING',
      payload: true,
    });
    this.store.dispatch({ type: 'RESET_LOADING' }); // RESET_LOADING에 해당하는 액션을 호출합니다.

    // SET_USER에 해당하는 액션을 payload와 함께 호출합니다.
    this.store.dispatch({
      type: 'SET_USER',
      payload: { name: 'Park', age: 20 },
    });
  }

  render() {
    return <Provider store={this.store}>리덕스 예제</Provider>;
  }
}

export default ReduxApp;

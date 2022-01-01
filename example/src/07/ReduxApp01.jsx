import React, { PureComponent } from 'react';
import { createStore } from 'redux'; // 리덕스의 createSotre() 함수를 임포트
import { Provider } from 'react-redux'; // react-redux의 Provider 컴포넌트를 사용하여 스토어 데이터를 하위 컴포넌트에 전달

class ReduxApp extends PureComponent {
  store = createStore(
    (state) => state,
    { loading: false, name: 'Chul' },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  render() {
    return <Provider store={this.store}>리덕스 예제</Provider>;
  }
}

export default ReduxApp;

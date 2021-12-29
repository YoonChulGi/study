import React, { PureComponent } from 'react';

// createContext() 함수에 빈 객체를 인자로 전달하여 공급자와 소비자를 생성합니다.
const { Provider, Consumer } = React.createContext({});

// 소비자를 익스포트합니다. 이후 이 소비자가 공급자의 컨텍스트 데이터를 구독하게 됩니다.
export { Consumer };

export default class LoadingProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
    this.setLoading = this.setLoading.bind(this);
  }

  setLoading(key, value) {
    const newState = { [key]: value };
    this.setState(newState);
  }

  render() {
    const context = {
      ...this.state, // 컨텍스트 데이터에 state값과 함께 콜백함수 setLoading()을 추가
      setLoading: this.setLoading,
    };

    // 공급자가 공유할 컨텍스트 데이터를 value프로퍼티에 전달합니다.
    // 자식 프로퍼티를 출력하여 자식 컴포넌트에 컨텍스트 데이터를 전달합니다.
    return <Provider value={context}>{this.props.children}</Provider>;
  }
}

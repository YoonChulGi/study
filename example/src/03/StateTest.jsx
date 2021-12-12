import React, { Component } from 'react';

class StateTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 컴포넌트의 state 초깃값을 this.state에 객체로 저장
      loading: true,
      formData: 'react',
    };
    this.handleData = this.handleData.bind(this); // 함수로 넘어갈 this는 생성자에서 bind함수로 전달
    setTimeout(this.handleData('data'), 5000); // 5초 후에 handleData() 호출
  }

  handleData(data) {
    this.setState(function (prevState) {
      const newState = {
        loading: false,
        formData: `${data} ${prevState.formData}`,
      };
      return newState;
    });
  }
  render() {
    return (
      <div>
        <span>로딩중: {String(this.state.loading)}</span>
        <span>결과: {this.state.formData}</span>
      </div>
    );
  }
}

export default StateTest;

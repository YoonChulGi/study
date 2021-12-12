import React, { Component } from 'react';

class ForceUpdate extends Component {
  constructor(props) {
    super(props);
    // state 정의
    this.loading = true;
    this.formData = 'react';
    this.handleData = this.handleData.bind(this);
    setTimeout(this.handleData, 5000);
  }
  handleData() {
    const data = 'hello';
    // state 변경
    this.loading = false;
    this.formData = `${data} ${this.formData}`;
    this.forceUpdate(); // 화면 강제 새로고침
  }
  render() {
    return (
      <div>
        <span>로딩중: {String(this.loading)}</span>
        <span>결과: {this.formData}</span>
      </div>
    );
  }
}

export default ForceUpdate;

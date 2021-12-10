import React, { Component } from 'react';
import PropTypes from 'prop-types'; // prop-types 라이브러리를 PropTypes 라는 이름으로 import
class PropsComponent extends Component {
  render() {
    return <div name="message-container">{this.props.name}</div>; // name 프로퍼티로 받은 문자열을 출력
  }
}

// 자료형 선언
PropsComponent.propTypes = {
  //PropsComponent의 propTypes라는 특수 변수 (import된 PropTypes와 다름)를 사용하여 프로퍼티의 자료형 정의
  name: PropTypes.string, // 프로퍼티의 자료형을 객체 형태로 지정
};

export default PropsComponent;

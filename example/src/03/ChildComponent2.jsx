import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChildComponent2 extends Component {
  render() {
    const { objVal, requiredStrVal } = this.props;
    return (
      <div>
        <div>객체값: {String(Object.entries(objVal))}</div>
        <div>필수값: {requiredStrVal}</div>
      </div>
    ); // 내장함수 String()과 Object.entries()를 사용하여 객체를 문자열로 변환하여 출력
  }
}
ChildComponent2.propTypes = {
  // 객체 프로퍼티의 자료형은 PropTypes의 shape를 사용하여 정의합니다
  objVal: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
  }),
  requiredStrVal: PropTypes.string.isRequired, // isRequired를 이용하면 필수 프로퍼티로 지정할 수 있습니다.
};

export default ChildComponent2;
